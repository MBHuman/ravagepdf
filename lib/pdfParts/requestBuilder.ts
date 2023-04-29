import { Content } from "pdfmake/interfaces";
import { Localize, PdfStyle } from "../types";
import { OpenAPIV3 } from "openapi-types";
import { ExampleBuilder } from "./exampleBuilder";
import { MediaTreeBuilder } from "./mediaTreeBuilder";


abstract class RequestBuilderBase {
  protected _localize: Localize;
  protected _pdfStyle: PdfStyle;
  protected _exampleBuilder: ExampleBuilder;
  protected _mediaTreeBuilder: MediaTreeBuilder;

  constructor(
    localize: Localize,
    pdfStyle: PdfStyle
  ) {
    this._localize = localize;
    this._pdfStyle = pdfStyle;
    this._exampleBuilder = new ExampleBuilder(
      localize,
      pdfStyle,
    );
    this._mediaTreeBuilder = new MediaTreeBuilder(
      localize
    );
  }

  protected abstract _genHeader(): Promise<Content>;

  protected abstract _genInfo(
    // eslint-disable-next-line no-unused-vars
    requestBody: OpenAPIV3.RequestBodyObject
  ): Promise<Content>;

  public abstract genDef(
    // eslint-disable-next-line no-unused-vars
    requestBody: OpenAPIV3.RequestBodyObject
  ): Promise<Content>;
}

export class RequestBuilder extends RequestBuilderBase {


  protected async _genHeader(): Promise<Content> {
    return {
      text: this._localize.request,
      style: ["p", "b", "alternate"],
      margin: [0, 10, 0, 0]
    } as Content;
  }

  protected async _genInfo(
    requestBody: OpenAPIV3.RequestBodyObject
  ): Promise<Content> {
    const content = [] as Content[];
    if (!requestBody.content) {
      return content;
    }
    for (const [type,] of Object.entries(requestBody.content)) {
      content.push({
        text: `${this._localize.requestBody} - ${type}`,
        margin: [0, 10, 0, 0],
        style: ["small", "b"]
      });
    }
    return content;
  }

  public async genDef(
    requestBody: OpenAPIV3.RequestBodyObject
  ): Promise<Content> {
    const content = [
      await this._genHeader(),
      await this._genInfo(requestBody)
    ] as Content[];
    return content;
  }

}