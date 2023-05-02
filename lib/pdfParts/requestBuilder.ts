import { Content } from "pdfmake/interfaces";
import { Localize, PdfStyle } from "../types";
import { OpenAPIV3 } from "openapi-types";
import { ExampleBuilder } from "./exampleBuilder";
import { MediaTreeBuilder } from "./mediaTreeBuilder";
import { OpenapiInfoV3 } from "../structures";

/**
 * RequestBuilderBase generates request information block with
 * header, description, path params, body schema and examples
 */
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
      localize,
      pdfStyle
    );
  }

  /**
   * Generates header for Request
   */
  protected abstract _genHeader(): Promise<Content>;

  /**
   * Generates information about request
   * 
   * @param requestBody 
   * @param openapi 
   */
  protected abstract _genInfo(
    // eslint-disable-next-line no-unused-vars
    requestBody: OpenAPIV3.RequestBodyObject,
    // eslint-disable-next-line no-unused-vars
    openapi: OpenapiInfoV3
  ): Promise<Content>;


  /**
   * Generates Request Content block
   * 
   * @param requestBody 
   * @param openapi 
   */
  public abstract genDef(
    // eslint-disable-next-line no-unused-vars
    requestBody: OpenAPIV3.RequestBodyObject,
    // eslint-disable-next-line no-unused-vars
    openapi: OpenapiInfoV3,
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
    requestBody: OpenAPIV3.RequestBodyObject,
    openapi: OpenapiInfoV3,
  ): Promise<Content> {
    const content = [] as Content[];
    if (!requestBody.content) {
      return content;
    }
    for (const [type, mediaObject] of Object.entries(requestBody.content)) {
      content.push([
        {
          text: `${this._localize.requestBody} - ${type}`,
          margin: [0, 10, 0, 0],
          style: ["small", "b"]
        },
        await this._mediaTreeBuilder.build(mediaObject, openapi),
        {
          text: this._localize.example,
          margin: [0, 10, 0, 0],
          style: ["small", "b", "blue"]
        },
        await this._exampleBuilder.build(mediaObject, openapi)
      ]);
    }
    return content;
  }

  public async genDef(
    requestBody: OpenAPIV3.RequestBodyObject,
    openapi: OpenapiInfoV3
  ): Promise<Content> {
    const content = [
      await this._genHeader(),
      await this._genInfo(requestBody, openapi),
    ] as Content[];
    return content;
  }

}