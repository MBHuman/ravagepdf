import { Content, ContentToc } from "pdfmake/interfaces";
import { PdfPartProcessor } from "./partProcessor";
import { Localize } from "../types";
import { OpenapiInfoV3 } from "../structures";


/**
 * PdfPartToc generates toc part for pdf file
 */
export class PdfPartToc extends PdfPartProcessor {


  async genDef(
    openapiTree: OpenapiInfoV3,
    localize: Localize,
    // eslint-disable-next-line no-unused-vars
    includeExample?: boolean
  ): Promise<Content> {
    const content = [{
      toc: {
        title: { text: localize.index, style: ["b", "h2"] },
        numberStyle: { bold: true },
        style: ["small"],
      },
      pageBreak: "after",
    } as ContentToc] as Content[];
    return new Promise((resolve) => {
      resolve(content);
    });
  }
}