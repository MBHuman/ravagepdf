import { Content } from "pdfmake/interfaces";
import { Localize, PdfStyle } from "../types";
import { OpenAPIV3 } from "openapi-types";
import { ExampleBuilder } from "./exampleBuilder";
import { MediaTreeBuilder } from "./mediaTreeBuilder";
import { OpenapiInfoV3 } from "../structures";


abstract class ResponseBuilderBase {

  protected _localize: Localize;
  protected _pdfStyle: PdfStyle;
  protected _exampleBuilder: ExampleBuilder;
  protected _mediaTreeBuilder: MediaTreeBuilder;

  constructor(
    localize: Localize,
    pdfStyle: PdfStyle,
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

  protected abstract _genHeader(
    // eslint-disable-next-line no-unused-vars
    code: string,
    // eslint-disable-next-line no-unused-vars
    response: OpenAPIV3.ResponseObject
  ): Promise<Content>;

  protected abstract _genInfo(
    // eslint-disable-next-line no-unused-vars
    responseBody: OpenAPIV3.ResponseObject,
    // eslint-disable-next-line no-unused-vars
    openapi: OpenapiInfoV3
  ): Promise<Content>;

  public abstract genResponse(
    // eslint-disable-next-line no-unused-vars
    code: string,
    // eslint-disable-next-line no-unused-vars
    response: OpenAPIV3.ResponseObject,
    // eslint-disable-next-line no-unused-vars
    openapi: OpenapiInfoV3
  ): Promise<Content>;
}

export class ResponseBuilder extends ResponseBuilderBase {
  protected async _genHeader(
    code: string,
    response: OpenAPIV3.ResponseObject
  ): Promise<Content> {
    return {
      text: [{
        text: `${this._localize.statusCode} - ${code}: `,
        style: ["small", "b"]
      },
      {
        text: response.description,
        style: ["small"]
      }],
      margin: [0, 10, 0, 0],
    };
  }

  protected async _genInfo(
    responseBody: OpenAPIV3.ResponseObject,
    openapi: OpenapiInfoV3
  ): Promise<Content> {
    const content = [] as Content[];
    if (!responseBody.content) {
      return content;
    }
    for (const [type, mediaObject] of Object.entries(responseBody.content)) {
      content.push([
        {
          text: `${this._localize.responseModel} - ${type}`,
          margin: [0, 10, 0, 0],
          style: ["small", "b"]
        },
        await this._mediaTreeBuilder.build(mediaObject, openapi)
      ]);
    }
    return content;
  }

  public async genResponse(
    code: string,
    response: OpenAPIV3.ResponseObject,
    openapi: OpenapiInfoV3
  ): Promise<Content> {
    const content = [
      await this._genHeader(
        code,
        response
      ),
      await this._genInfo(response, openapi)
    ] as Content;

    return content;
  }
}