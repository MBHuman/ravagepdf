import { Content } from "pdfmake/interfaces";
import { PdfPartProcessor } from "./partProcessor";
import { OpenapiInfoV3 } from "../structures";
import { Localize } from "../types";

export class PdfPartApi extends PdfPartProcessor {

  /**
   * TODO: #2 Add PdfPartApi class for build main api part in pdf
   * @returns 
   */
  async genDef(
    openapiTree: OpenapiInfoV3,
    localize: Localize,
    // eslint-disable-next-line no-unused-vars
    includeExample?: boolean
  ): Promise<Content> {
    const content = [
      { text: localize.api, style: ["h2", "b"] }
    ];
    return new Promise((resolve) => {
      resolve(content);
    });
  }
}