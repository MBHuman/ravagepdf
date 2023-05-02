import { OpenAPIV3 } from "openapi-types";
import { Localize, PdfStyle } from "../types";
import { Content, ContentTable } from "pdfmake/interfaces";
import {
  OpenapiInfoV3, OperationObjectWithPath,
  RowLinesTableLayout
} from "../structures";


/**
 * PathParamsBuilder generates information about 
 * path queries for OperationObject
 */
abstract class PathParamsBuilderBase {

  protected _localize: Localize;
  protected _pdfStyle: PdfStyle;

  constructor(localize: Localize, pdfStyle: PdfStyle) {
    this._localize = localize;
    this._pdfStyle = pdfStyle;
  }

  /**
   * Genereates header Content block for PathParams
   */
  protected abstract _genHeader(): Promise<Content>;

  /**
   * Returns query path param
   * 
   * @param param
   * @param opeanapi 
   */
  protected abstract _getParam(
    // eslint-disable-next-line no-unused-vars
    param: OpenAPIV3.ReferenceObject | OpenAPIV3.ParameterObject,
    // eslint-disable-next-line no-unused-vars
    opeanapi: OpenapiInfoV3
  ): Promise<OpenAPIV3.ParameterObject>;

  /**
   * Returns schemaObject from OpenAPIV3.ReferenceObject or
   * from OpenAPIV3.SchemaObject
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
   * Generates tableContent by operationObject
   * 
   * @param operationObj
   * @param openapi 
   */
  protected abstract _genTableContent(
    // eslint-disable-next-line no-unused-vars
    operationObj: OperationObjectWithPath,
    // eslint-disable-next-line no-unused-vars
    openapi: OpenapiInfoV3
  ): Promise<Content>;

  /**
   * Generates Content block for table PathParamsBuilder
   * 
   * @param operationObj 
   * @param openapi 
   */
  public abstract genDef(
    // eslint-disable-next-line no-unused-vars
    operationObj: OperationObjectWithPath,
    // eslint-disable-next-line no-unused-vars
    openapi: OpenapiInfoV3
  ): Promise<Content>;
}

export class PathParamsBuilder extends PathParamsBuilderBase {

  protected async _genHeader(): Promise<Content> {
    return {
      text: "PATH PARAMS",
      style: ["p", "b", "alternate"],
      margin: [0, 10, 0, 0]
    } as Content;
  }

  protected async _getParam(
    param: OpenAPIV3.ReferenceObject | OpenAPIV3.ParameterObject,
    // eslint-disable-next-line no-unused-vars
    opeanapi: OpenapiInfoV3
  ): Promise<OpenAPIV3.ParameterObject> {
    const tmpParam = param as OpenAPIV3.ReferenceObject;
    if (!tmpParam.$ref) {
      return param as OpenAPIV3.ParameterObject;
    }
    return {} as OpenAPIV3.ParameterObject;
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

  protected async _genTableContent(
    operationObj: OperationObjectWithPath,
    openapi: OpenapiInfoV3
  ): Promise<Content> {
    if (!operationObj.parameters) {
      throw new Error(
        "In PathParamsBuilder operationObj.parameters is undefined"
      );
    }
    const tableContent = [
      [
        {
          text: this._localize.name,
          style: ["small", "b", "blue"]
        },
        {
          text: this._localize.type,
          style: ["small", "b", "blue"]
        },
        {
          text: "REQUIRED",
          style: ["small", "b", "blue"]
        },
        {
          text: this._localize.example,
          style: ["small", "b", "blue"]
        },
        {
          text: this._localize.description,
          style: ["small", "b", "blue"]
        },
      ]
    ] as Content[];

    for (const param of operationObj.parameters) {
      const paramObj = await this._getParam(param, openapi);
      if (paramObj === {} as OpenAPIV3.ParameterObject) {
        continue;
      }
      const info = {
        name: paramObj.name,
        type: "",
        required: paramObj.required ?? false,
        example: "",
        description: ""
      };
      if (paramObj.schema) {
        const schema = await this._getSchemaObj(
          paramObj.schema,
          openapi
        );

        info.type = schema.type ?? "";
        info.example = schema.example ?? "";
        info.description = schema.description ?? "";
      }
      tableContent.push([
        {
          text: info.name,
          style: ["small", "b", "black"]
        },
        {
          text: info.type,
          style: ["small", "b", "black"]
        },
        {
          text: info.required ? "+" : "-",
          style: ["small", "b", "black"]
        },
        {
          text: info.example,
          style: ["small", "b", "black"]
        },
        {
          text: info.description,
          style: ["small", "b", "black"]
        }
      ] as Content);
    }
    const content = {
      table: {
        headerRows: 1,
        dontBreakRows: true,
        widths: ["auto", "*", "*", "*", "*"],
        body: tableContent
      },
      layout: RowLinesTableLayout,
      style: "tableMargin"
    } as ContentTable;
    return content;
  }

  public async genDef(
    operationObj: OperationObjectWithPath,
    openapi: OpenapiInfoV3,
  ): Promise<Content> {
    if (!operationObj.parameters) {
      return {} as Content;
    }
    return [
      await this._genHeader(),
      await this._genTableContent(operationObj, openapi),
    ];
  }
}