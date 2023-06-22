import { Content } from "pdfmake/interfaces";
import { PathBuilder } from "./pathBuilder";
import { OpenapiInfoV3, OperationObjectWithPath } from "../structures";
import { OpenAPIV3 } from "openapi-types";
import { markdownToPdfmake } from "../utils/markdown";
import { IRavageOptions } from "../types/options";

/**
 * PathsTagBuilder generates Content tag block with
 * paths that tag contains
 */
export abstract class PathsTagBuilderBase {

  protected _options?: IRavageOptions;
  protected _pathBuilder: PathBuilder;

  constructor(
    options?:IRavageOptions
  ) {
    this._options = options;
    this._pathBuilder = new PathBuilder(
      options
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
   * Generates description for tag Content
   * 
   * @param tag
   * @param openapi
   */
  protected abstract _genDescription(
    // eslint-disable-next-line no-unused-vars
    tag: string,
    // eslint-disable-next-line no-unused-vars
    openapi: OpenapiInfoV3
  ): Promise<Content>;

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

  protected async _genDescription(
    tag: string,
    openapi: OpenapiInfoV3
  ): Promise<Content> {
    const tagInfo = await this._getTagInfo(tag, openapi);
    return markdownToPdfmake(tagInfo.description ?? "");
  }

  private async _getTagInfo(
    tag: string,
    openapi: OpenapiInfoV3
  ): Promise<OpenAPIV3.TagObject> {
    const tags = openapi.api.tags?.filter((tagObject) => {
      return tagObject.name === tag;
    });
    if (typeof tags === "undefined" || tags?.length !== 1) {
      return {} as OpenAPIV3.TagObject;
    }
    return tags[0];
  }

  public async genTag(
    tag: string,
    tagSeq: number,
    operationObjects: OperationObjectWithPath[],
    openapi: OpenapiInfoV3
  ): Promise<Content> {
    const content = [
      await this._genHeader(tag, tagSeq),
      await this._genDescription(tag, openapi),
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