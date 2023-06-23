import { OpenAPIV3 } from "openapi-types";
import { Content, ContentStack } from "pdfmake/interfaces";
import { DescriptionBuilder } from "./descriptionBuilder";
import { OpenapiInfoV3 } from "../structures";
import { IRavageOptions } from "../types/options";

/**
 * MediaTreeBuilderBase generates HTTP Body information from
 * openapi, add description for all properties and information
 * about AllOf, AnyOf, OneOf. Also It include composition of
 * DescriptionBuilder and can be extended by multiple descriptionBuilder
 * realisations with any variatives.
 */
export abstract class MediaTreeBuilderBase {

  protected _descriptionBuilder: DescriptionBuilder;
  protected _options?: IRavageOptions;

  constructor(options?: IRavageOptions) {
    this._options = options;
    this._descriptionBuilder = new DescriptionBuilder(
      this._options
    );
  }

  /**
   * Generates open bracket and desctiption of open schema block
   * 
   * @param obj 
   * @param openapi 
   * @param prevKey 
   */
  protected abstract _genKeyDef(
    // eslint-disable-next-line no-unused-vars
    obj: OpenAPIV3.SchemaObject,
    // eslint-disable-next-line no-unused-vars
    openapi: OpenapiInfoV3,
    // eslint-disable-next-line no-unused-vars
    prevKey: string
  ): Promise<Content>;

  /**
   * Get schema by $ref from openapi.components.schemas
   * if it's OpenAPIV3.ReferenceObject or reutrns `obj`
   * if it's not OpenAPIV3.ReferenceObject
   * 
   * @param obj 
   * @param openapi 
   */
  protected abstract _getSchemaObj(
    // eslint-disable-next-line no-unused-vars
    obj: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject,
    // eslint-disable-next-line no-unused-vars
    openapi: OpenapiInfoV3
  ): Promise<OpenAPIV3.SchemaObject>;

  /**
   * Generates Body tree by OpenAPIV3.ReferenceObject or
   * OpenAPIV3.SchemaObject
   * 
   * @param obj 
   * @param openapi 
   * @param prevKey 
   * @param required 
   */
  protected abstract _genTree(
    // eslint-disable-next-line no-unused-vars
    obj: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject,
    // eslint-disable-next-line no-unused-vars
    openapi: OpenapiInfoV3,
    // eslint-disable-next-line no-unused-vars
    prevKey?: string,
    // eslint-disable-next-line no-unused-vars
    required?: boolean
  ): Promise<Content>;

  /**
   * Build Content block for OpenAPI Body schema
   * 
   * @param obj 
   * @param openapi 
   * @param required 
   */
  public abstract build(
    // eslint-disable-next-line no-unused-vars
    obj: OpenAPIV3.MediaTypeObject,
    // eslint-disable-next-line no-unused-vars
    openapi: OpenapiInfoV3,
    // eslint-disable-next-line no-unused-vars
    required: boolean
  ): Promise<Content>;
}

export class MediaTreeBuilder extends MediaTreeBuilderBase {

  protected async _genKeyDef(
    obj: OpenAPIV3.SchemaObject,
    openapi: OpenapiInfoV3,
    prevKey: string
  ): Promise<Content> {
    // let keyDef: Content;

    const keyDef = {
      stack: [{
        text: `${prevKey} ${obj.type === "array" ?
          "[" : "{"}`,
        style: ["small", "mono"]
      }] as Content[],
    };

    if (obj.description) {
      keyDef.stack.push({
        text: obj.description ?? "",
        style: ["sub", "gray"],
        margin: [0, 0, 0, 4],
      });
    }

    return keyDef;
  }

  protected async _getSchemaObj(
    obj: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject,
    openapi: OpenapiInfoV3
  ): Promise<OpenAPIV3.SchemaObject> {
    const tmpObj = obj as OpenAPIV3.ReferenceObject;
    if (!tmpObj.$ref) {
      return obj as OpenAPIV3.SchemaObject;
    }
    const schemaName = tmpObj.$ref.split("/").slice(-1)[0];
    if (!(
      openapi.components.schemas &&
      openapi.components.schemas[schemaName]
    )) {
      return {} as OpenAPIV3.SchemaObject;
    }
    const schemaObj = openapi.components.schemas[schemaName];

    return await this._getSchemaObj(schemaObj, openapi);
  }

  protected async _genTree(
    obj: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject,
    openapi: OpenapiInfoV3,
    prevKey = "",
    required = false,
  ): Promise<Content> {
    const schema = await this._getSchemaObj(
      obj,
      openapi
    );

    if (schema.type && (
      schema.type === "boolean" ||
      schema.type === "integer" ||
      schema.type === "number" ||
      schema.type === "string"
    ) || schema.enum) {

      const descrStack = await this._descriptionBuilder.genProp(
        schema,
        required
      );
      const type = await this._descriptionBuilder.genType(schema);
      return [
        { text: prevKey, style: ["small", "mono"], margin: 0 },
        {
          text: type,
          style: ["small", "mono", "lightGray"], margin: 0
        },
        { stack: descrStack, margin: 0 },
      ] as Content;
    }
    const rows = [
      [
        { text: "", margin: 0 },
        { text: "", margin: 0 },
        { text: "", margin: 0 },
      ],
    ] as Content[];


    if (schema.anyOf || schema.oneOf || schema.allOf) {
      const allOptions = [] as Content[];
      if (schema.anyOf) {
        for (const k of schema.anyOf) {
          allOptions.push(await this._genTree(k, openapi));
        }
      } else if (schema.oneOf) {
        for (const k of schema.oneOf) {
          allOptions.push(await this._genTree(k, openapi));
        }
      } else if (schema.allOf) {
        for (const k of schema.allOf) {
          allOptions.push(await this._genTree(k, openapi));
        }
      }
      const allOptionsWithHeader = allOptions.map((content, index) => [
        {
          text: `OPTION ${index + 1}`,
          style: ["sub", "blue", "b"],
          margin: [0, 5, 0, 0]
        },
        content
      ]) as Content[];
      return [
        {
          colSpan: 3,
          stack: [
            { text: `${prevKey}`, style: ["small", "mono"] },
            {
              margin: [10, 0, 0, 0],
              stack: [
                {
                  text: schema.anyOf ? "ANY OF" :
                    schema.oneOf ? "ONE OF" : "ALL OF",
                  style: ["sub", "blue", "b"],
                  margin: [0, 5, 0, 0]
                },
                ...allOptionsWithHeader,
              ],
            },
          ],
        } as ContentStack,
      ];
    }

    if (schema.properties) {
      const requiredSet = new Set(schema.required);
      for (const [name, prop] of Object.entries(schema.properties)) {
        const objectDef = await this._genTree(
          prop,
          openapi,
          name,
          requiredSet.has(name)
        );
        rows.push(objectDef);
      }
    }
    else if (schema.type && schema.type === "array") {
      const schemaArr = schema as OpenAPIV3.ArraySchemaObject;
      const schemaItems = await this._getSchemaObj(schemaArr.items, openapi);
      const objectDef = await this._genTree(
        schemaItems, openapi
      );
      rows.push(objectDef);
    }

    if (schema.additionalProperties &&
      typeof schema.additionalProperties !== "boolean") {
      const objectDef = await this._genTree(
        schema.additionalProperties,
        openapi,
        "`additionalProp`"
      );
      rows.push(objectDef);
    }


    const keyDef = await this._genKeyDef(
      schema,
      openapi,
      prevKey
    );

    return [
      {
        colSpan: 3,
        stack: [
          keyDef,
          {
            margin: [10, 0, 0, 0],
            layout: {
              defaultBorder: false,
              hLineWidth() {
                return 0;
              },
              vLineWidth() {
                return 0;
              },
              paddingTop() {
                return 0;
              },
              paddingBottom() {
                return 0;
              },
            },
            table: {
              headerRows: 0,
              widths: ["auto", "auto", "*"],
              dontBreakRows: false,
              body: rows,
            },
          },
          {
            text: `${schema.type == "array" ? "]" : "}"}`,
            style: ["small", "mono"]
          },
        ],
      } as ContentStack,
    ];
  }

  public async build(
    obj: OpenAPIV3.MediaTypeObject,
    openapi: OpenapiInfoV3,
  ): Promise<Content> {
    return obj.schema ? await this._genTree(
      obj.schema,
      openapi
    ) : {} as Content;
  }
}