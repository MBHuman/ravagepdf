import { Content } from "pdfmake/interfaces";
import { RavageLocalizeEnum } from "../types";
import { OpenAPIV3 } from "openapi-types";
import { ExampleBuilder } from "./exampleBuilder";
import { MediaTreeBuilder } from "./mediaTreeBuilder";
import { OpenapiInfoV3 } from "../structures";
import { IRavageOptions } from "../types/options";

/**
 * RequestBuilderBase generates request information block with
 * header, description, path params, body schema and examples
 */
export abstract class RequestBuilderBase {
  protected _options?: IRavageOptions;
  protected _exampleBuilder: ExampleBuilder;
  protected _mediaTreeBuilder: MediaTreeBuilder;

  constructor(
    options?: IRavageOptions
  ) {
    this._options = options;
    this._exampleBuilder = new ExampleBuilder(
      this._options,
    );
    this._mediaTreeBuilder = new MediaTreeBuilder(
      this._options,
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
      text: this._options?.localize?.request ?? RavageLocalizeEnum.REQUEST,
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
          text: `${this._options?.localize?.requestBody ??
            RavageLocalizeEnum.REQUEST_BODY} - ${type}`,
          margin: [0, 10, 0, 0],
          style: ["small", "b"]
        },
        await this._mediaTreeBuilder.build(mediaObject, openapi),
        {
          text: this._options?.localize?.example ??
            RavageLocalizeEnum.EXAMPLE,
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