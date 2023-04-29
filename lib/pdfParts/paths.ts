import { Content } from "pdfmake/interfaces";
import { OpenapiInfoV3 } from "../structures";
import { Localize, PdfStyle } from "../types";
import { PdfPartProcessor } from "./partProcessor";
import { PathsTagBuilder } from "./pathsTagBuilder";


export class PdfPartPaths extends PdfPartProcessor {

  protected async _genHeader(localize: Localize): Promise<Content> {
    return {
      text: localize.api,
      style: ["h2", "b"]
    } as Content;
  }

  public async genDef(
    openapiTree: OpenapiInfoV3,
    localize: Localize,
    includeExample?: boolean
  ): Promise<Content> {
    const pathsTagBuilder = new PathsTagBuilder(localize, {} as PdfStyle);
    const tagsPaths = [] as Content[];
    let tagSeq = 1;
    for (const [tag, paths] of Object.entries(openapiTree.tagsToPaths)) {
      tagsPaths.push(
        await pathsTagBuilder.genTag(tag, tagSeq, paths)
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