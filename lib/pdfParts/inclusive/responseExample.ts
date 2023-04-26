import { Content } from "pdfmake/interfaces";
import { OperationObjectWithPath } from "../../structures";
import { ReqResBuilder } from "./reqResBuilder";


export class ResponseExampleBuilder extends ReqResBuilder {

  public async genResponseExample(
    operationObject: OperationObjectWithPath
  ): Promise<Content> {
    throw new Error("Not implemented");
  }
}