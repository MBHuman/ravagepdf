import { Content } from "pdfmake/interfaces";
import { RavageLocalizeEnum } from "../types";
import { OpenAPIV3 } from "openapi-types";
import { IRavageOptions } from "../types/options";

/**
 * DescriptionBuilder is class that can generate description Content blocks
 * for MediaTreeBuilder by OpenAPIV3.SchemaObject
 */
export abstract class DescriptionBuilderBase {
  protected _options?: IRavageOptions;

  constructor(options?: IRavageOptions) {
    this._options = options;
  }

  /**
   * Generates Content block with read only or write only
   * from OpenAPIV3.SchemaObject if it exists
   * 
   * @param prop 
   */
  protected abstract _genReadOrWrite(
    // eslint-disable-next-line no-unused-vars
    prop: OpenAPIV3.SchemaObject
  ): Promise<Content>;

  /**
   * Generates Content block with min, max, inclusiveMax, inclusiveMin
   * from OpenAPIV3.SchemaObject if it exists
   * 
   * @param prop 
   */
  protected abstract _genConstraints(
    // eslint-disable-next-line no-unused-vars
    prop: OpenAPIV3.SchemaObject
  ): Promise<Content>;

  /**
   * Generates Content block with default value for propertie
   * from OpenAPIV3.SchemaObject if it exists
   * 
   * @param prop 
   */
  protected abstract _genDefault(
    // eslint-disable-next-line no-unused-vars
    prop: OpenAPIV3.SchemaObject
  ): Promise<Content>;

  /**
   * Generates Content block with pattern value
   * from OpenAPIV3.SchemaObject if it exists
   * 
   * @param prop 
   */
  protected abstract _genPattern(
    // eslint-disable-next-line no-unused-vars
    prop: OpenAPIV3.SchemaObject
  ): Promise<Content>;

  /**
   * Generates Content block with title
   * from OpenAPIV3.SchemaObject if it exists
   * 
   * @param prop 
   */
  protected abstract _genName(
    // eslint-disable-next-line no-unused-vars
    prop: OpenAPIV3.SchemaObject
  ): Promise<Content>;

  /**
   * Generates Content block with description from
   * OpenAPIV3.SchemaObject if it exists
   * 
   * @param prop 
   */
  protected abstract _genDescr(
    // eslint-disable-next-line no-unused-vars
    prop: OpenAPIV3.SchemaObject
  ): Promise<Content>;

  /**
   * 
   * Generates Content blcok with required red flag
   * from OpenAPIV3.SchemaObject if it exists
   * 
   * @param required 
   */
  protected abstract _genRequired(
    // eslint-disable-next-line no-unused-vars
    required: boolean
  ): Promise<Content>;

  /**
   * 
   * Generates Content block with desctiption for
   * MediaTreeBuilder properties
   * 
   * @param prop 
   * @param required 
   */
  public abstract genProp(
    // eslint-disable-next-line no-unused-vars
    prop: OpenAPIV3.SchemaObject,
    // eslint-disable-next-line no-unused-vars
    required: boolean
  ): Promise<Content>;
}

export class DescriptionBuilder extends DescriptionBuilderBase {

  protected async _genReadOrWrite(
    // eslint-disable-next-line no-unused-vars
    prop: OpenAPIV3.SchemaObject
  ): Promise<Content> {
    throw new Error("Method not implemented");
  }
  protected async _genConstraints(
    // eslint-disable-next-line no-unused-vars
    prop: OpenAPIV3.SchemaObject
  ): Promise<Content> {
    throw new Error("Method not implemented");
  }
  protected async _genDefault(
    prop: OpenAPIV3.SchemaObject
  ): Promise<Content> {
    if (!prop.default) {
      return {} as Content;
    }
    return {
      text: [
        {
          text: `${
            this._options?.localize?.default ?? 
            RavageLocalizeEnum.DEFAULT
          }: `,
          style: ["sub", "b", "darkGray"]
        },
        { text: prop.default ?? "", style: ["small", "darkGray", "mono"] },
      ],
    } as Content;
  }

  protected async _genPattern(
    prop: OpenAPIV3.SchemaObject
  ): Promise<Content> {
    return {
      text: [
        { text: `${
          this._options?.localize?.pattern ?? 
          RavageLocalizeEnum.PATTERN}:`, style: ["sub", "b", "darkGray"] },
        { text: prop.pattern ?? "", style: ["small", "lightGray", "mono"] },
      ],
    } as Content;
  }
  protected async _genName(
    prop: OpenAPIV3.SchemaObject
  ): Promise<Content> {
    return {
      text: prop.title ?? "",
      style: ["sub", "lightGray"],
      margin: [0, 3, 0, 0],
    } as Content;
  }

  protected async _genDescr(
    prop: OpenAPIV3.SchemaObject
  ): Promise<Content> {
    return {
      text: prop.description ?? "",
      style: ["sub", "lightGray"],
      margin: [0, 3, 0, 0],
    } as Content;
  }

  protected async _genEnum(
    prop: OpenAPIV3.SchemaObject
  ): Promise<Content> {
    if (prop.enum && (
      prop.enum.every((elem) => typeof elem === "string") ||
      prop.enum.every((elem) => typeof elem === "number")
    )) {
      return {
        text: [
          {
            text: `${this._options?.localize?.allowed ?? 
              RavageLocalizeEnum.ALLOWED}: `,
            style: ["sub", "b", "darkGray"]
          },
          {
            text: `${prop.enum.join(", ")}`,
            style: ["small", "lightGray", "mono"]
          },
        ],
      } as Content;
    }
    return {} as Content;
  }

  protected async _genRequired(
    required: boolean
  ): Promise<Content> {
    if (!required) {
      return {} as Content;
    }
    return {
      text: "required",
      style: ["sub", "b", "red"]
    } as Content;
  }

  public async genProp(
    prop: OpenAPIV3.SchemaObject,
    required: boolean
  ): Promise<Content> {
    return [
      await this._genRequired(required),
      await this._genDefault(prop),
      // await this._genPattern(prop),
      await this._genEnum(prop),
      await this._genDescr(prop)
    ] as Content;
  }

  public async genType(prop: OpenAPIV3.SchemaObject): Promise<string> {
    if (prop.enum) {
      return "enum";
    }
    return prop.type ?? "" as string;
  }
}