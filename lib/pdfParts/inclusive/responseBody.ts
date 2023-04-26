import { Content } from "pdfmake/interfaces";
import { OperationObjectWithPath } from "../../structures";
import { ReqResBuilder } from "./reqResBuilder";


export class ResponseBodyBuilder extends ReqResBuilder {

  public async genResponseBody(
    operationObject: OperationObjectWithPath
  ): Promise<Content> {
    throw new Error("Not implemented");
  }
}