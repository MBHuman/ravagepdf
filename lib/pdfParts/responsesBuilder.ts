import { Content } from "pdfmake/interfaces";
import { Localize, PdfStyle } from "../types";
import { OpenAPIV3 } from "openapi-types";
import { ResponseBuilder } from "./responseBuilder";
import { OpenapiInfoV3 } from "../structures";

/**
 * ResponsesBuilderBase builds responses Content
 * blocks for PathsTagBuilderBase
 */
abstract class ResponsesBuilderBase {
  protected _localize: Localize;
  protected _pdfStyle: PdfStyle;
  protected _responseBuilder: ResponseBuilder;

  constructor(
    localize: Localize,
    pdfStyle: PdfStyle
  ) {
    this._localize = localize;
    this._pdfStyle = pdfStyle;
    this._responseBuilder = new ResponseBuilder(
      localize,
      pdfStyle,
    );
  }

  /**
   * Generates header for responses
   */
  protected abstract _genHeader(): Promise<Content>;

  /**
   * Generates Content block for reponses
   * 
   * @param responses 
   * @param openapi 
   */
  public abstract genDef(
    // eslint-disable-next-line no-unused-vars
    responses: OpenAPIV3.ResponsesObject,
    // eslint-disable-next-line no-unused-vars
    openapi: OpenapiInfoV3
  ): Promise<Content>;
}

export class ResponsesBuilder extends ResponsesBuilderBase {
  protected async _genHeader(): Promise<Content> {
    return {
      text: this._localize.response,
      style: ["p", "b", "alternate"],
      margin: [0, 10, 0, 0]
    } as Content;
  }
  public async genDef(
    responses: OpenAPIV3.ResponsesObject,
    openapi: OpenapiInfoV3
  ): Promise<Content> {
    const content = [
      await this._genHeader()
    ] as Content[];
    if (!responses) {
      return content;
    }
    for (const [code, response] of Object.entries(responses as
      Record<string, OpenAPIV3.ResponseObject>)) {
      content.push([
        await this._responseBuilder.genResponse(
          code,
          response,
          openapi
        )
      ]);
    }
    return content;
  }
}