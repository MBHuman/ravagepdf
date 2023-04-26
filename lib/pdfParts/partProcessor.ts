import { Content } from "pdfmake/interfaces";
import { OpenapiInfoV3 } from "../structures";
import { marked } from "marked";
import htmlToPdfmake from "html-to-pdfmake";
import { JSDOM } from "jsdom";
import { Localize } from "../types";


/**
 * PdfPartProcessorBase is class that can create pdfmake content
 * blocks with method `genDef` and create `markdownToPdfmake` method
 * that can convert markdown to pdfmake content blocks.
 * from `openapiTree` that conains information about openapi specs
 * 
 * @abstract
 * @class PdfPartProcessorBase
 */
abstract class PdfPartProcessorBase {

  /**
   * This method convert markdown string
   * to pdfmake content blocks.
   * 
   * @example
   * ```typescript
   * async function main() {
   *   const processor = new PdfPartProcessor();
   *   const markdown = "# Header\n Paragraph text";
   *   const result = await processor.markdownToPdfmake(markdown);
   * }
   * 
   * main();
   * ```
   * 
   * @param markdown 
   */
  // eslint-disable-next-line no-unused-vars
  abstract markdownToPdfmake(markdown: string): Promise<Content>;

  /**
   * This method create pdfmake content blocks
   * by `openapiTree` that contains information about
   * openapi specs,
   * by `localize` that contains information about
   * localize pdfmake content blocks,
   * and by `includeExample` that contains information about
   * requests and responses.
   * @example
   * ```typescript
   * async function main() {
   *   const processor = new PdfPartProcessor();
   *   const openapiTree = {} as OpenapiInfoV3;
   *   const localize = {} as Localize;
   *   const includeExample = true;
   *   const result = await processor.genDef(
   *    openapiTree, 
   *    localize, 
   *    includeExample
  *    );
   * }
   * 
   * main();
   * ``` 
   * 
   * @param openapiTree 
   * @param localize 
   * @param includeExample 
   */
  abstract genDef(
    // eslint-disable-next-line no-unused-vars
    openapiTree: OpenapiInfoV3,
    // eslint-disable-next-line no-unused-vars
    localize: Localize,
    // eslint-disable-next-line no-unused-vars
    includeExample?: boolean
  ): Promise<Content>;
}

export class PdfPartProcessor extends PdfPartProcessorBase {
  async markdownToPdfmake(markdown: string): Promise<Content> {
    const html = await marked(markdown);
    const { window } = new JSDOM();
    return new Promise((resolve) => {
      resolve(htmlToPdfmake(html, { window: window }) as Content[]);
    });
  }
  async genDef(
    // eslint-disable-next-line no-unused-vars
    openapiTree: OpenapiInfoV3,
    // eslint-disable-next-line no-unused-vars
    localize: Localize,
    // eslint-disable-next-line no-unused-vars
    includeExample?: boolean
  ): Promise<Content> {
    throw new Error("Method not implemented.");
  }
}