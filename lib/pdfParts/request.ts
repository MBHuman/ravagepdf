import { Content } from "pdfmake/interfaces";
import { PdfPartProcessor } from "./partProcessor";
import { OpenapiInfoV3 } from "../structures";
import { Localize } from "../types";

// :TODO #5 implement PdfPartRequest
export class PdfPartRequest extends PdfPartProcessor {

  async genDef(
    openapiTree: OpenapiInfoV3,
    localize: Localize,
    includeExample?: boolean
  ): Promise<Content> {
    const content = [] as Content;


    return new Promise((resolve) => {
      resolve(content);
    });
  }
}

/**
 * PdfPartRequestEmpty returns an empty content of
 * request part.
 */
export class PdfPartRequestEmpty extends PdfPartProcessor {

  /**
   * 
   * @returns Empty content
   */
  async genDef(
    // eslint-disable-next-line no-unused-vars
    openapiTree: OpenapiInfoV3,
    // eslint-disable-next-line no-unused-vars
    localize: Localize,
    // eslint-disable-next-line no-unused-vars
    includeExample?: boolean
  ): Promise<Content> {
    return new Promise((resolve) => {
      resolve([]);
    });
  }
}