import { Content } from "pdfmake/interfaces";
import { Localize, PdfStyle } from "../types";
import { RequestBuilder } from "./requestBuilder";
import { ResponsesBuilder } from "./responsesBuilder";
import { OpenapiInfoV3, OperationObjectWithPath } from "../structures";
import { OpenAPIV3 } from "openapi-types";
import { markdownToPdfmake } from "../utils/markdown";
import { PathParamsBuilder } from "./pathParamsBuilder";

/**
 * PathBuilder generate Content block for path part of
 * openapi specs and generates `header`, `description`, 
 * `pathParams`, `request`, `responses`
 */
export abstract class PathBuilderBase {

  protected _localize: Localize;
  protected _pdfStyle: PdfStyle;
  protected _header: Content[];
  protected _description: Content;
  protected _pathParams: Content;
  protected _request: Content;
  protected _responses: Content;
  protected _requestBuilder: RequestBuilder;
  protected _responsesBuilder: ResponsesBuilder;
  protected _pathParamsBuilder: PathParamsBuilder;

  constructor(
    localize: Localize,
    pdfStyle: PdfStyle
  ) {
    this._localize = localize;
    this._pdfStyle = pdfStyle;
    this._header = [] as Content[];
    this._description = {} as Content;
    this._pathParams = {} as Content;
    this._request = {} as Content;
    this._responses = {} as Content;
    this._requestBuilder = new RequestBuilder(
      localize,
      pdfStyle,
    );
    this._responsesBuilder = new ResponsesBuilder(
      localize,
      pdfStyle,
    );
    this._pathParamsBuilder = new PathParamsBuilder(
      localize,
      pdfStyle,
    );
  }

  /**
   * Generates header for path OperaitonObject
   * 
   * @param tagSeq 
   * @param methodSeq 
   * @param operationObject 
   */
  protected abstract _genHeader(
    // eslint-disable-next-line no-unused-vars
    tagSeq: number,
    // eslint-disable-next-line no-unused-vars
    methodSeq: number,
    // eslint-disable-next-line no-unused-vars
    operationObject: OperationObjectWithPath
  ): Promise<Content[]>;

  /**
   * Generates description for path OperaitonObject
   * 
   * @param operationObject 
   */
  protected abstract _genDescription(
    // eslint-disable-next-line no-unused-vars
    operationObject: OperationObjectWithPath
  ): Promise<Content>;

  /**
   * 
   * Generates PathParams for path OperationObject
   * 
   * @param operationObject 
   * @param openapi 
   */
  protected abstract _genPathParams(
    // eslint-disable-next-line no-unused-vars
    operationObject: OperationObjectWithPath,
    // eslint-disable-next-line no-unused-vars
    openapi: OpenapiInfoV3
  ): Promise<Content>;

  /**
   * Generates request description for path Operationobject
   * 
   * @param operationObject 
   * @param openapi 
   */
  protected abstract _genRequest(
    // eslint-disable-next-line no-unused-vars
    operationObject: OperationObjectWithPath,
    // eslint-disable-next-line no-unused-vars
    openapi: OpenapiInfoV3
  ): Promise<Content>;

  /**
   * Generates response description for path OperationObject
   * 
   * @param operationObject 
   * @param openapi 
   */
  protected abstract _genResponses(
    // eslint-disable-next-line no-unused-vars
    operationObject: OperationObjectWithPath,
    // eslint-disable-next-line no-unused-vars
    openapi: OpenapiInfoV3
  ): Promise<Content>;

  /**
   * Build all content with declared methods
   * 
   * @param tagSeq 
   * @param methodSeq 
   * @param operationObject 
   * @param openapi 
   */
  protected abstract _buildContent(
    // eslint-disable-next-line no-unused-vars
    tagSeq: number,
    // eslint-disable-next-line no-unused-vars
    methodSeq: number,
    // eslint-disable-next-line no-unused-vars
    operationObject: OperationObjectWithPath,
    // eslint-disable-next-line no-unused-vars
    openapi: OpenapiInfoV3
  ): Promise<void>;

  /**
   * Generates path Content block for provided
   * OperaiotnObject
   * 
   * @param tagSeq 
   * @param methodSeq 
   * @param operationObject 
   * @param openapi 
   */
  public abstract genPath(
    // eslint-disable-next-line no-unused-vars
    tagSeq: number,
    // eslint-disable-next-line no-unused-vars
    methodSeq: number,
    // eslint-disable-next-line no-unused-vars
    operationObject: OperationObjectWithPath,
    // eslint-disable-next-line no-unused-vars
    openapi: OpenapiInfoV3
  ): Promise<Content>;
}

export class PathBuilder extends PathBuilderBase {
  protected async _genHeader(
    tagSeq: number,
    methodSeq: number,
    operationObject: OperationObjectWithPath
  ): Promise<Content[]> {
    return [
      {
        text: [
          {
            text: `${tagSeq}.${methodSeq} `
          },
          {
            text: `${operationObject.method
              .toUpperCase()} ${operationObject.path}`,

            decoration: operationObject.deprecated ? "lineThrough" : undefined
          },
          {
            text: operationObject.deprecated ? " DEPRECATED " : ""
          },
        ],
        tocItem: true,
        style: ["topMargin3", "mono", "p", "primary", "b"],
        tocStyle: ["small", "blue", "mono"],
        tocNumberStyle: ["small", "blue", "mono"],
      },
      { text: "", style: ["topMarginRegular"] },
      {
        stack: await markdownToPdfmake(operationObject.summary),
        style: ["primary", "b"],
      }
    ] as Content[];
  }
  protected async _genDescription(
    operationObject: OperationObjectWithPath
  ): Promise<Content> {
    const content = {
      stack: await markdownToPdfmake(
        operationObject.description
      )
    };
    return content;
  }
  protected async _genPathParams(
    operationObject: OperationObjectWithPath,
    openapi: OpenapiInfoV3,
  ): Promise<Content> {
    return this._pathParamsBuilder.genDef(
      operationObject,
      openapi,
    );
  }
  protected async _genRequest(
    operationObject: OperationObjectWithPath,
    openapi: OpenapiInfoV3
  ): Promise<Content> {
    return operationObject.requestBody ?
      this._requestBuilder.genDef(
        operationObject.requestBody as OpenAPIV3.RequestBodyObject,
        openapi
      ) : {} as Content;
  }
  protected async _genResponses(
    operationObject: OperationObjectWithPath,
    openapi: OpenapiInfoV3
  ): Promise<Content> {
    return this._responsesBuilder.genDef(
      operationObject.responses as OpenAPIV3.ResponsesObject,
      openapi
    );
  }
  protected async _buildContent(
    tagSeq: number,
    methodSeq: number,
    operationObject: OperationObjectWithPath,
    openapi: OpenapiInfoV3
  ): Promise<void> {
    this._header = await this._genHeader(
      tagSeq,
      methodSeq,
      operationObject,
    );
    this._description = await this._genDescription(operationObject);
    this._pathParams = await this._genPathParams(operationObject, openapi);
    this._request = await this._genRequest(operationObject, openapi);
    this._responses = await this._genResponses(operationObject, openapi);
  }

  public async genPath(
    tagSeq: number,
    methodSeq: number,
    operationObject: OperationObjectWithPath,
    openapi: OpenapiInfoV3
  ): Promise<Content> {
    await this._buildContent(
      tagSeq,
      methodSeq,
      operationObject,
      openapi
    );
    return [
      ...this._header,
      this._description,
      this._pathParams,
      operationObject.method !== "get" ? this._request : {},
      this._responses
    ] as Content[];
  }

}