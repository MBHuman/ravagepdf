import { Content } from "pdfmake/interfaces";
import { OperationObjectWithPath } from "../../structures";
import { ReqResBuilder } from "./reqResBuilder";


export class ResponsesBuilder extends ReqResBuilder {

  public async genResponses(
    operationObject: OperationObjectWithPath
  ): Promise<Content> {
    throw new Error("Not implemented");
  }
}