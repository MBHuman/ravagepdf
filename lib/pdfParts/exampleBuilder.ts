import { Content, Table } from "pdfmake/interfaces";
import { Localize, PdfStyle } from "../types";
import { OpenAPIV3 } from "openapi-types";
import { OpenapiInfoV3 } from "../structures";

/**
 * ExampleBuilder generates examples from OpenAPIV3.ReferenceObject
 * of OpenAPIV3.SchemaObject with auto detect examples, default value,
 * enum value 
 * 
 * if value has example it returns example
 * 
 * if value has default type instead example it returns default value
 * 
 * if value is enum, it returns first possible value
 * 
 * if value is integer returns 0
 * 
 * if value is boolean returns false
 * 
 * if value is string returns "string"
 * 
 */
export abstract class ExampleBuilderBase {

  protected _localize: Localize;
  protected _pdfStyle: PdfStyle;

  constructor(
    localize: Localize,
    pdfStyle: PdfStyle
  ) {
    this._localize = localize;
    this._pdfStyle = pdfStyle;
  }

  /**
   * Get schema from openapi.components.schemas, if `obj` is
   * OpenAPIV3.SchemaObject it returns `obj`, otherwise it search
   * OpenAPIV3.SchemaObject
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
   * Build example with object type with recursive DFS algorithm on
   * graph with nodes OpenAPIV3.ReferenceObject or OpenAPIV3.SchemaObject
   * 
   * @param obj 
   * @param openapi 
   */
  protected abstract _buildObj(
    // eslint-disable-next-line no-unused-vars
    obj: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject,
    // eslint-disable-next-line no-unused-vars
    openapi: OpenapiInfoV3
  ): Promise<object>;

  /**
   * Generates JSON string with indent for Content block example
   * 
   * @param obj 
   * @param openapi 
   */
  protected abstract _genJsonString(
    // eslint-disable-next-line no-unused-vars
    obj: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject,
    // eslint-disable-next-line no-unused-vars
    openapi: OpenapiInfoV3
  ): Promise<string>;

  /**
   * Build example and returns Content block with indent
   * 
   * @param schema 
   * @param openapi 
   */
  public abstract build(
    // eslint-disable-next-line no-unused-vars
    schema: OpenAPIV3.SchemaObject,
    // eslint-disable-next-line no-unused-vars
    openapi: OpenapiInfoV3
  ): Promise<Content>;
}

export class ExampleBuilder extends ExampleBuilderBase {

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

  protected async _buildObj(
    obj: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject,
    openapi: OpenapiInfoV3
  ): Promise<object> {
    const schema = await this._getSchemaObj(obj, openapi);
    const res = {} as { [key: string]: any };
    if (!schema.type) {
      if (schema.anyOf && schema.anyOf.length > 0) {
        return this._buildObj(schema.anyOf[0], openapi);
      } else if (schema.oneOf && schema.oneOf.length > 0) {
        return this._buildObj(schema.oneOf[0], openapi);
      }
      return res;
    }
    if (schema.type === "array") {
      return [
        await this._buildObj(schema.items, openapi)
      ];
    } else if (schema.type === "object") {
      if (schema.properties) {
        for (const [name, prop] of Object.entries(schema.properties)) {
          const schemaProp = await this._getSchemaObj(prop, openapi);
          if (schemaProp.type &&
            schemaProp.type !== "array" &&
            schemaProp.type !== "object"
          ) {
            res[name] = typeof schemaProp.example !== "undefined" ?
              schemaProp.example : schemaProp.default ?
                schemaProp.default : (
                  schemaProp.enum &&
                  schemaProp.enum.length > 0
                ) ?
                  schemaProp.enum[0] : (schemaProp.type ? (
                    schemaProp.type === "boolean" ? true :
                      schemaProp.type === "number" ? 0.0 :
                        schemaProp.type === "integer" ? 0 :
                          "string") : "");
          } else if (schemaProp.type === "array") {
            res[name] = [
              await this._buildObj(schemaProp.items, openapi)
            ];
          } else if (schemaProp.type === "object") {
            res[name] = await this._buildObj(schemaProp, openapi);
          } else {
            if (schemaProp.allOf) {
              res[name] = schemaProp.allOf.length > 0 ?
                await this._buildObj(schemaProp.allOf[0], openapi) :
                {};
            } else if (schemaProp.anyOf) {
              res[name] = schemaProp.anyOf.length > 0 ?
                await this._buildObj(schemaProp.anyOf[0], openapi) :
                {};
            } else if (schemaProp.oneOf) {
              res[name] = schemaProp.oneOf.length > 0 ?
                await this._buildObj(schemaProp.oneOf[0], openapi) :
                {};
            }
          }
        }
      } else if (schema.additionalProperties &&
        typeof schema.additionalProperties !== "boolean") {
        res["additionalProp"] = await this._buildObj(
          schema.additionalProperties,
          openapi
        );
      } else if (typeof schema.example !== "undefined") {
        return schema.example;
      }
    } else {
      return schema.example ?
        schema.example : schema.default ?
          schema.default : (
            schema.enum &&
            schema.enum.length > 0
          ) ?
            schema.enum[0] : (schema.type ? (
              schema.type === "boolean" ? false :
                schema.type === "number" ? 0.0 :
                  schema.type === "integer" ? 0 :
                    "string") : "");
    }
    return res;
  }

  protected async _genJsonString(
    obj: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject,
    openapi: OpenapiInfoV3
  ): Promise<string> {
    const data = await this._buildObj(obj, openapi);
    return JSON.stringify(data, null, 2);
  }

  public async build(
    obj: OpenAPIV3.MediaTypeObject,
    openapi: OpenapiInfoV3
  ): Promise<Content> {
    if (!obj.schema) {
      return {} as Content;
    }
    const json = await this._genJsonString(obj.schema, openapi);
    return {
      table: {
        body: [[
          {
            border: [true, true, true, true],
            fillColor: "#eeeeff",
            text: json,
            style: {
              preserveLeadingSpaces: true
            }
          }
        ]],
        widths: "*",
      } as Table
    } as Content;
  }
}