import { Content } from "pdfmake/interfaces";
import { Localize, PdfStyle } from "../types";
import { PathBuilder } from "./pathBuilder";
import { OpenapiInfoV3, OperationObjectWithPath } from "../structures";

/**
 * PathsTagBuilder generates Content tag block with
 * paths that tag contains
 */
export abstract class PathsTagBuilderBase {

  protected _localize: Localize;
  protected _pdfStyle: PdfStyle;
  protected _pathBuilder: PathBuilder;

  constructor(
    localize: Localize,
    pdfStyle: PdfStyle
  ) {
    this._localize = localize;
    this._pdfStyle = pdfStyle;
    this._pathBuilder = new PathBuilder(
      localize,
      pdfStyle
    );
  }

  /**
   * Generates header for PathTag Content
   * 
   * @param tag 
   * @param tagSeq 
   */
  // eslint-disable-next-line no-unused-vars
  protected abstract _genHeader(tag: string, tagSeq: number): Promise<Content>;

  /**
   * Generates tag Content with paths for pdf
   * 
   * @param tag 
   * @param tagSeq 
   * @param operationObjects 
   * @param openapi 
   */
  public abstract genTag(
    // eslint-disable-next-line no-unused-vars
    tag: string,
    // eslint-disable-next-line no-unused-vars
    tagSeq: number,
    // eslint-disable-next-line no-unused-vars
    operationObjects: OperationObjectWithPath[],
    // eslint-disable-next-line no-unused-vars
    openapi: OpenapiInfoV3,
  ): Promise<Content>;

}

export class PathsTagBuilder extends PathsTagBuilderBase {

  protected async _genHeader(tag: string, tagSeq: number): Promise<Content> {
    return {
      text: `${tagSeq}. ${tag.toUpperCase()}`,
      style: ["h2", "b", "primary", "tableMargin"],
      tocItem: true,
      tocStyle: ["small", "b"],
      tocMargin: [0, 10, 0, 0],
    } as Content;
  }

  public async genTag(
    tag: string,
    tagSeq: number,
    operationObjects: OperationObjectWithPath[],
    openapi: OpenapiInfoV3
  ): Promise<Content> {
    const content = [
      await this._genHeader(tag, tagSeq),
    ] as Content[];
    let methodSeq = 1;
    for (const operationObject of operationObjects) {
      content.push(await this._pathBuilder.genPath(
        tagSeq,
        methodSeq,
        operationObject,
        openapi
      ));
      methodSeq++;
    }

    return content;
  }
}