import { Content } from "pdfmake/interfaces";
import { OperationObjectWithPath } from "../../structures";
import { ReqResBuilder } from "./reqResBuilder";


export class RequestExampleBuilder extends ReqResBuilder {

  public async genRequestExample(
    operationObject: OperationObjectWithPath
  ): Promise<Content> {
    throw new Error("Not implemented");
  }
}