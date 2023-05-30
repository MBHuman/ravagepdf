import { Content } from "pdfmake/interfaces";
import { OpenapiInfoV3 } from "../structures";
import { Localize, PdfStyle } from "../types";
import { PdfPartProcessor } from "./partProcessor";
import { PathsTagBuilder } from "./pathsTagBuilder";

/**
 * PdfPartPaths is PdfPart for PdfPartBuilder that can
 * be added to pdf
 */
export class PdfPartPaths extends PdfPartProcessor {

  /**
   * Generates header for PdfPartPaths
   * 
   * @param localize 
   * @returns 
   */
  protected async _genHeader(localize: Localize): Promise<Content> {
    return {
      text: localize.api,
      style: ["h2", "b"]
    } as Content;
  }

  public async genDef(
    openapiTree: OpenapiInfoV3,
    localize: Localize,
    // eslint-disable-next-line no-unused-vars
    includeExample?: boolean
  ): Promise<Content> {
    const pathsTagBuilder = new PathsTagBuilder(localize, {} as PdfStyle);
    const tagsPaths = [] as Content[];
    let tagSeq = 1;
    for (const [tag, paths] of Object.entries(openapiTree.tagsToPaths)) {
      tagsPaths.push(
        await pathsTagBuilder.genTag(tag, tagSeq, paths, openapiTree)
      );
      tagSeq++;
    }

    const content = [
      await this._genHeader(localize),
      tagsPaths
    ];
    return content;
  }
}