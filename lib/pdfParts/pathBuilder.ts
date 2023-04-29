import { Content } from "pdfmake/interfaces";
import { Localize, PdfStyle } from "../types";
import { RequestBuilder } from "./requestBuilder";
import { ResponsesBuilder } from "./responsesBuilder";
import { OperationObjectWithPath } from "../structures";
import { OpenAPIV3 } from "openapi-types";
import { markdownToPdfmake } from "../utils/markdown";


abstract class PathBuilderBase {

  protected _localize: Localize;
  protected _pdfStyle: PdfStyle;
  protected _header: Content[];
  protected _description: Content;
  protected _request: Content;
  protected _responses: Content;
  protected _requestBuilder: RequestBuilder;
  protected _responsesBuilder: ResponsesBuilder;

  constructor(
    localize: Localize,
    pdfStyle: PdfStyle
  ) {
    this._localize = localize;
    this._pdfStyle = pdfStyle;
    this._header = [] as Content[];
    this._description = {} as Content;
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
  }

  protected abstract _genHeader(
    // eslint-disable-next-line no-unused-vars
    tagSeq: number,
    // eslint-disable-next-line no-unused-vars
    methodSeq: number,
    // eslint-disable-next-line no-unused-vars
    operationObject: OperationObjectWithPath
  ): Promise<Content[]>;
  protected abstract _genDescription(
    // eslint-disable-next-line no-unused-vars
    operationObject: OperationObjectWithPath
  ): Promise<Content>;
  protected abstract _genRequest(
    // eslint-disable-next-line no-unused-vars
    operationObject: OperationObjectWithPath
  ): Promise<Content>;
  protected abstract _genResponses(
    // eslint-disable-next-line no-unused-vars
    operationObject: OperationObjectWithPath
  ): Promise<Content>;

  protected abstract _buildContent(
    // eslint-disable-next-line no-unused-vars
    tagSeq: number,
    // eslint-disable-next-line no-unused-vars
    methodSeq: number,
    // eslint-disable-next-line no-unused-vars
    operationObject: OperationObjectWithPath
  ): Promise<void>;

  public abstract genPath(
    // eslint-disable-next-line no-unused-vars
    tagSeq: number,
    // eslint-disable-next-line no-unused-vars
    methodSeq: number,
    // eslint-disable-next-line no-unused-vars
    operationObject: OperationObjectWithPath
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
            text: operationObject.deprecated ? "DEPRECATED " : ""
          },
          {
            text: `${tagSeq}.${methodSeq} ${operationObject
              .method.toUpperCase()} ${operationObject.path}`,

            decoration: operationObject.deprecated ? "lineThrough" : undefined
          }],
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
  protected async _genRequest(
    operationObject: OperationObjectWithPath
  ): Promise<Content> {
    return operationObject.requestBody ?
      this._requestBuilder.genDef(
        operationObject.requestBody as OpenAPIV3.RequestBodyObject
      ) : {} as Content;
  }
  protected async _genResponses(
    operationObject: OperationObjectWithPath
  ): Promise<Content> {
    return this._responsesBuilder.genDef(
      operationObject.responses as OpenAPIV3.ResponsesObject
    );
  }
  protected async _buildContent(
    tagSeq: number,
    methodSeq: number,
    operationObject: OperationObjectWithPath
  ): Promise<void> {
    this._header = await this._genHeader(
      tagSeq,
      methodSeq,
      operationObject,
    );
    this._description = await this._genDescription(operationObject);
    this._request = await this._genRequest(operationObject);
    this._responses = await this._genResponses(operationObject);
  }

  public async genPath(
    tagSeq: number,
    methodSeq: number,
    operationObject: OperationObjectWithPath
  ): Promise<Content> {
    await this._buildContent(
      tagSeq,
      methodSeq,
      operationObject,
    );
    return [
      ...this._header,
      this._description,
      this._request,
      this._responses
    ] as Content[];
  }

}