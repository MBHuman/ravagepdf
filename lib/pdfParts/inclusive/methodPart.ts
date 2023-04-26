import { Content } from "pdfmake/interfaces";
import { OperationObjectWithPath } from "../../structures";
import { RequestBodyBuilder } from "./requestBody";
import { RequestExampleBuilder } from "./requestExample";
import { ResponseExampleBuilder } from "./responseExample";
import { ResponsesBuilder } from "./responses";
import { Localize } from "../../types";
import { ResponseBodyBuilder } from "./responseBody";

/**
 * MethodPart is class that create method request
 * and response body docs to pdf by openapi schema from Swagger
 * parser
 * 
 * Also it contains methods `genRequestBody`, `genResponseBody`,
 * `genResponses`, `genRequestExample`, `genResponseExample`
 * 
 */
abstract class MethodPartBase {

  protected _localize: Localize;
  protected _requestBodyBuilder: RequestBodyBuilder;
  protected _requestExampleBuilder: RequestExampleBuilder;
  protected _responseBodyBuilder: ResponseBodyBuilder;
  protected _responseExampleBuilder: ResponseExampleBuilder;
  protected _responsesBuilder: ResponsesBuilder;

  constructor(
    localize: Localize,
  ) {
    this._localize = localize;
    this._requestBodyBuilder = new RequestBodyBuilder(localize);
    this._requestExampleBuilder = new RequestExampleBuilder(localize);
    this._responseBodyBuilder = new ResponseBodyBuilder(localize);
    this._responseExampleBuilder = new ResponseExampleBuilder(localize);
    this._responsesBuilder = new ResponsesBuilder(localize);
  }

  /**
   * Method that generate request
   * 
   * @param operationObject This is an object that contains
   * information about the openapi operation object but extended
   * with path and method information.
   * 
   * @example
   * ```typescript
   * 
   * async function main() {
   *  const operationObject = {
   *    path: "/users",
   *    method: "get",
   *    ...
   *  }
   *  const methodPart = new MethodPartBuilder(
   *  const requestBody = await methodPart.genRequestBody(operationObject),
   * }
   * 
   * main();
   * ```
   */
  public abstract genRequestBody(
    // eslint-disable-next-line no-unused-vars
    operationObject: OperationObjectWithPath
  ): Promise<Content>;

  /**
   * Method that generate response
   * 
   * @param operationObject This is an object that contains
   * information about the openapi operation object but extended
   * with path and method information.
   * 
   * @example
   * ```typescript
   * 
   * async function main() {
   *  const operationObject = {
   *    path: "/users",
   *    method: "get",
   *    ...
   *  }
   *  const methodPart = new MethodPartBuilder(
   *  const requestBody = await methodPart.genResponseBody(operationObject),
   * }
   * 
   * main();
   * ```
   */
  public abstract genResponseBody(
    // eslint-disable-next-line no-unused-vars
    operationObject: OperationObjectWithPath
  ): Promise<Content>;

  /**
   * Method that generate responses
   * 
   * @param operationObject This is an object that contains
   * information about the openapi operation object but extended
   * with path and method information.
   * 
   * @example
   * ```typescript
   * 
   * async function main() {
   *  const operationObject = {
   *    path: "/users",
   *    method: "get",
   *    ...
   *  }
   *  const methodPart = new MethodPartBuilder(
   *  const requestBody = await methodPart.getResponses(operationObject),
   * }
   * 
   * main();
   * ```
   */
  public abstract genResponses(
    // eslint-disable-next-line no-unused-vars
    operationObject: OperationObjectWithPath
  ): Promise<Content>;

  /**
   * Method that generate request example
   * 
   * @param operationObject This is an object that contains
   * information about the openapi operation object but extended
   * with path and method information.
   * 
   * @example
   * ```typescript
   * 
   * async function main() {
   *  const operationObject = {
   *    path: "/users",
   *    method: "get",
   *    ...
   *  }
   *  const methodPart = new MethodPartBuilder(
   *  const requestBody = await methodPart.genRequestExample(operationObject),
   * }
   * 
   * main();
   * ```
   */
  public abstract genRequestExample(
    // eslint-disable-next-line no-unused-vars
    operationObject: OperationObjectWithPath
  ): Promise<Content>;

  /**
   * Method that generate response example
   * 
   * @param operationObject This is an object that contains
   * information about the openapi operation object but extended
   * with path and method information.
   * 
   * @example
   * ```typescript
   * 
   * async function main() {
   *  const operationObject = {
   *    path: "/users",
   *    method: "get",
   *    ...
   *  }
   *  const methodPart = new MethodPartBuilder(
   *  const requestBody = await methodPart.genResponseExample(operationObject),
   * }
   * 
   * main();
   * ```
   */
  public abstract genResponseExample(
    // eslint-disable-next-line no-unused-vars
    operationObject: OperationObjectWithPath
  ): Promise<Content>;

}

export class MethodPart extends MethodPartBase {
  public async genRequestBody(
    operationObject: OperationObjectWithPath
  ): Promise<Content> {
    return this._requestBodyBuilder.genRequestBody(operationObject);
  }
  public async genResponseBody(
    operationObject: OperationObjectWithPath
  ): Promise<Content> {
    return this._responseBodyBuilder.genResponseBody(operationObject);
  }
  public async genResponses(
    operationObject: OperationObjectWithPath
  ): Promise<Content> {
    return this._responsesBuilder.genResponses(operationObject);
  }
  public async genRequestExample(
    operationObject: OperationObjectWithPath
  ): Promise<Content> {
    return this._requestExampleBuilder.genRequestExample(operationObject);
  }
  public async genResponseExample(
    operationObject: OperationObjectWithPath
  ): Promise<Content> {
    return this._responseExampleBuilder.genResponseExample(operationObject);
  }
}