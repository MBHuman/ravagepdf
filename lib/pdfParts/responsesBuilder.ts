import { Content } from "pdfmake/interfaces";
import { Localize, PdfStyle } from "../types";
import { OpenAPIV3 } from "openapi-types";
import { ResponseBuilder } from "./responseBuilder";


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

  protected abstract _genHeader(): Promise<Content>;

  public abstract genDef(
    // eslint-disable-next-line no-unused-vars
    responses: OpenAPIV3.ResponsesObject
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
    responses: OpenAPIV3.ResponsesObject
  ): Promise<Content> {
    const content = [
      await this._genHeader()
    ] as Content[];
    // const content = [
    //   await this._genHeader()
    // ] as Content[];
    for (const [code, response] of Object.entries(responses as
      Record<string, OpenAPIV3.ResponseObject>)) {
      content.push([
        await this._responseBuilder.genResponse(
          code,
          response
        )
      ]);
    }
    return content;
  }
}