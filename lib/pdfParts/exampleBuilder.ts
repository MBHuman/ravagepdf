import { Content } from "pdfmake/interfaces";
import { Localize, PdfStyle } from "../types";
import { OpenAPIV3 } from "openapi-types";
import { OpenapiInfoV3 } from "../structures";


abstract class ExampleBuilderBase {

  protected _localize: Localize;
  protected _pdfStyle: PdfStyle;

  constructor(
    localize: Localize,
    pdfStyle: PdfStyle
  ) {
    this._localize = localize;
    this._pdfStyle = pdfStyle;
  }

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
            res[name] = schemaProp.example ?
              schemaProp.example : schemaProp.default ?
                schemaProp.default : (
                  schemaProp.enum &&
                  schemaProp.enum.length > 0
                ) ?
                  schemaProp.enum[0] : (schemaProp.type ? (
                    schemaProp.type === "boolean" ? false :
                      schemaProp.type === "number" ? 0.0 :
                        schemaProp.type === "integer" ? 0 :
                          "string") : "");
            schemaProp.type;
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
    const content = [
      { text: "", marginTop: 10 },
    ] as Content[];
    for (const el of json.split("\n")) {
      const match = el.match(/^\s+/);
      const count = match ? match[0].length : 0;
      content.push({
        text: el,
        margin: [count * 5, 0, 0, 0]
      });
    }
    return content;
  }
}