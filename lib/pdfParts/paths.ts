import { Content } from "pdfmake/interfaces";
import { OpenapiInfoV3 } from "../structures";
import { PdfPartProcessor } from "./partProcessor";
import { PathsTagBuilder } from "./pathsTagBuilder";
import { IRavageOptions } from "../types/options";
import { RavageLocalizeEnum } from "../types";

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
  protected async _genHeader(options?: IRavageOptions): Promise<Content> {
    return {
      text: options?.localize?.api ?? RavageLocalizeEnum.API,
      style: ["h2", "b"]
    } as Content;
  }

  public async genDef(
    openapiTree: OpenapiInfoV3,
    options?: IRavageOptions
  ): Promise<Content> {
    const pathsTagBuilder = new PathsTagBuilder(options);
    const tagsPaths = [] as Content[];
    let tagSeq = 1;
    for (const [tag, paths] of Object.entries(openapiTree.tagsToPaths)) {
      tagsPaths.push(
        await pathsTagBuilder.genTag(tag, tagSeq, paths, openapiTree)
      );
      tagSeq++;
    }

    const content = [
      await this._genHeader(options),
      tagsPaths
    ];
    return content;
  }
}