import { Content } from "pdfmake/interfaces";
import { OperationObjectWithPath } from "../../structures";
import { ReqResBuilder } from "./reqResBuilder";


export class RequestBodyBuilder extends ReqResBuilder {

  public async genRequestBody(
    operationObject: OperationObjectWithPath
  ): Promise<Content> {
    throw new Error("Not implemented");
  }
}