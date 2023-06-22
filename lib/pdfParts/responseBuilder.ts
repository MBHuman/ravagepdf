import { Content } from "pdfmake/interfaces";
import { RavageLocalizeEnum } from "../types";
import { OpenAPIV3 } from "openapi-types";
import { ExampleBuilder } from "./exampleBuilder";
import { MediaTreeBuilder } from "./mediaTreeBuilder";
import { OpenapiInfoV3 } from "../structures";
import { IRavageOptions } from "../types/options";

/**
 * ResponseBuilderBase generates request information block with
 * header, description, path params, body schema and examples
 */
export abstract class ResponseBuilderBase {

  protected _options?: IRavageOptions;
  protected _exampleBuilder: ExampleBuilder;
  protected _mediaTreeBuilder: MediaTreeBuilder;

  constructor(
    options?: IRavageOptions
  ) {
    this._exampleBuilder = new ExampleBuilder(
      options
    );
    this._mediaTreeBuilder = new MediaTreeBuilder(
      options
    );
  }

  /**
   * Generates header for Reponse
   */
  protected abstract _genHeader(
    // eslint-disable-next-line no-unused-vars
    code: string,
    // eslint-disable-next-line no-unused-vars
    response: OpenAPIV3.ResponseObject
  ): Promise<Content>;

  /**
   * Generates information about response
   * 
   * @param responseBody 
   * @param openapi 
   */
  protected abstract _genInfo(
    // eslint-disable-next-line no-unused-vars
    responseBody: OpenAPIV3.ResponseObject,
    // eslint-disable-next-line no-unused-vars
    openapi: OpenapiInfoV3
  ): Promise<Content>;

  /**
   * Generates Response Content block
   * 
   * @param code 
   * @param response 
   * @param openapi 
   */
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
        text: `${this._options?.localize?.statusCode ??
          RavageLocalizeEnum.STATUS_CODE} - ${code}: `,
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
          text: `${this._options?.localize?.responseModel ??
            RavageLocalizeEnum.RESPONSE_MODEL} - ${type}`,
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