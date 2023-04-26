import { Content } from "pdfmake/interfaces";
import { PdfPartProcessor } from "./partProcessor";
import { Localize } from "../types";
import { OpenapiInfoV3 } from "../structures";

// :TODO #6 Implement PdfPartResponse
export class PdfPartResponse extends PdfPartProcessor {

  async genDef(
    openapiTree: OpenapiInfoV3,
    localize: Localize,
    includeExample?: boolean
  ): Promise<Content> {
    throw new Error("Method not implemented.");
  }
}