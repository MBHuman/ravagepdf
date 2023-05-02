import { Content } from "pdfmake/interfaces";
import { OpenapiInfoV3 } from "../structures";
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