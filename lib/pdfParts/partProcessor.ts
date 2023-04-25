import { Content } from "pdfmake/interfaces";
import { OpenapiInfoV3 } from "../structures";
import { marked } from "marked";
import htmlToPdfmake from "html-to-pdfmake";
import { JSDOM } from "jsdom";
import { Localize } from "../types";



abstract class PdfPartProcessorBase {

  protected _openapiTree: OpenapiInfoV3;
  protected _includeExample: boolean;
  protected _localize: Localize;

  constructor(
    openapiTree: OpenapiInfoV3,
    localize: Localize,
    includeExample = true
  ) {
    this._openapiTree = openapiTree;
    this._includeExample = includeExample;
    this._localize = localize;
  }

  // eslint-disable-next-line no-unused-vars
  abstract markdownToPdfmake(markdown: string): Promise<Content>;
  abstract genDef(): Promise<Content>;
}

export class PdfPartProcessor extends PdfPartProcessorBase {
  async markdownToPdfmake(markdown: string): Promise<Content> {
    const html = await marked(markdown);
    const { window } = new JSDOM();
    return new Promise((resolve) => {
      resolve(htmlToPdfmake(html, { window: window }) as Content[]);
    });
  }
  async genDef(): Promise<Content> {
    throw new Error("Method not implemented.");
  }
}