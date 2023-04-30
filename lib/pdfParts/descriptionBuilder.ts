import { Content } from "pdfmake/interfaces";
import { Localize } from "../types";
import { OpenAPIV3 } from "openapi-types";


abstract class DescriptionBuilderBase {
  protected _localize: Localize;

  constructor(localize: Localize) {
    this._localize = localize;
  }
  protected abstract _genReadOrWrite(
    // eslint-disable-next-line no-unused-vars
    prop: OpenAPIV3.SchemaObject
  ): Promise<Content>;

  protected abstract _genConstraints(
    // eslint-disable-next-line no-unused-vars
    prop: OpenAPIV3.SchemaObject
  ): Promise<Content>;

  protected abstract _genDefault(
    // eslint-disable-next-line no-unused-vars
    prop: OpenAPIV3.SchemaObject
  ): Promise<Content>;

  protected abstract _genPattern(
    // eslint-disable-next-line no-unused-vars
    prop: OpenAPIV3.SchemaObject
  ): Promise<Content>;

  protected abstract _genName(
    // eslint-disable-next-line no-unused-vars
    prop: OpenAPIV3.SchemaObject
  ): Promise<Content>;

  protected abstract _genDescr(
    // eslint-disable-next-line no-unused-vars
    prop: OpenAPIV3.SchemaObject
  ): Promise<Content>;

  protected abstract _genRequired(
    // eslint-disable-next-line no-unused-vars
    required: boolean
  ): Promise<Content>;


  public abstract genProp(
    // eslint-disable-next-line no-unused-vars
    prop: OpenAPIV3.SchemaObject,
    // eslint-disable-next-line no-unused-vars
    required: boolean
  ): Promise<Content>;
}

export class DescriptionBuilder extends DescriptionBuilderBase {

  protected async _genReadOrWrite(
    prop: OpenAPIV3.SchemaObject
  ): Promise<Content> {
    throw new Error("Method not implemented");
  }
  protected async _genConstraints(
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
          text: `${this._localize.default}: `,
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
        { text: `${this._localize.pattern}:`, style: ["sub", "b", "darkGray"] },
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
            text: `${this._localize.allowed}: `,
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