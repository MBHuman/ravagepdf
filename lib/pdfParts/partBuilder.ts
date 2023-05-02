import { Content } from "pdfmake/interfaces";
import { PdfPartProcessor } from "./partProcessor";
import { Localize, PdfStyle } from "../types";
import { OpenapiInfoV3 } from "../structures";
import { OpenAPI } from "openapi-types";


/**
 * PdfPartBuilderBase abstract class
 * 
 * PdfPartBuilderBase is class that build all pdfParts
 * and can contain them in one array of with type PdfPartProcessor
 * with abstract async method `buildParts` that returns Content from
 * `pdfmake/interfaces` module
 * 
 * It contains information about localization, pdfStyle and
 * Openapi specification parsed with SwaggerParser
 * 
 * Also PdfPartBuilderBase can add new part to array of parts
 * with abstract async method `addPart` and `addParts`
 * 
 * @abstract
 * @class PdfPartBuilderBase
 */
abstract class PdfPartBuilderBase {

  protected _localization: Localize;
  protected _pdfStyle: PdfStyle;
  protected _pdfParts: PdfPartProcessor[];
  protected _openapiInfo: OpenapiInfoV3;
  protected _includeExamples: boolean | undefined;

  /**
   * 
   * @param localization localization type object that contains inforamation
   * about localization of pdf
   * @param pdfStyle pdfStyle type object that contains inforamation
   * about style of pdf
   * @param includeExamples boolean value that indicates whether to include
   * examples to requests and responses in pdf
   */
  constructor(
    localization: Localize,
    pdfStyle: PdfStyle,
    includeExamples?: boolean
  ) {
    this._localization = localization;
    this._pdfStyle = pdfStyle;
    this._pdfParts = [];
    this._openapiInfo = new OpenapiInfoV3();
    this._includeExamples = includeExamples;
  }
  /**
   * Build all pdfParts and return array of them
   * @example
   * ```typescript
   * async function main() {
   *  const partsBuilder = new PartBuilder(
   *    localization, 
   *    pdfStyle,
   *    includeExamples
   *  );
   *  await partsBuilder.addPart(new Part1());
   *  await partsBuilder.addPart(new Part2());
   *  await partsBuilder.buildParts();
   * }
   * 
   * main();
   * ```
   * 
   * @example
   * ```typescript
   * async function main() {
   *  const partsBuilder = new PartBuilder(
   *    localization, 
   *    pdfStyle,
   *    includeExamples
   *  );
   *  await partsBuilder.addParts([new Part1(), new Part2()]);
   *  await partsBuilder.buildParts();
   * }
   * 
   * main();
   * ```
   * @param apiPath path to api specification file or url
   */
  // eslint-disable-next-line no-unused-vars
  abstract buildParts(apiPath: string | OpenAPI.Document): Promise<Content>;
  /**
   * Add new part to array of parts
   * @example
   * ```typescript
   * async function main() {
   *  const partsBuilder = new PartBuilder(
   *    localization, 
   *    pdfStyle,
   *    includeExamples
   *  );
   *  await partsBuilder.addPart(new Part1());
   * }
   * 
   * main();
   * ```
   * @param part 
   */
  // eslint-disable-next-line no-unused-vars
  public abstract addPart(part: PdfPartProcessor): Promise<void>;
  /** 
   * Add new parts to array of parts
   * @example
   * ```typescript
   * async function main() {
   *  const partsBuilder = new PartBuilder(
   *    localization, 
   *    pdfStyle,
   *    includeExamples
   *  );
   *  await partsBuilder.addParts([new Part1(), new Part2()]);
   * }
   * 
   * main();
   * ```
  */
  // eslint-disable-next-line no-unused-vars
  public abstract addParts(parts: PdfPartProcessor[]): Promise<void>;

  /**
   * Method that clean array of parts
   * 
   * @example
   * ```typescript
   * async function main() {
   *  const partsBuilder = new PartBuilder(
   *      localization,
   *      pdfStyle,
   *      includeExamples
   *  );
   *  partsBuilder.cleanParts();
   * }
   * 
   * main();
   * ```
   */
  public abstract cleanParts(): Promise<void>;
}


export class PdfPartBuilder extends PdfPartBuilderBase {

  public async buildParts(
    apiPath: string | OpenAPI.Document
  ): Promise<Content> {
    await this._openapiInfo.parseAndBuild(apiPath);
    const promises = this._pdfParts.map((part) => part.genDef(
      this._openapiInfo,
      this._localization,
      this._includeExamples,
    ));
    const contents = await Promise.all(promises);
    return contents;
  }

  public async addPart(part: PdfPartProcessor): Promise<void> {
    this._pdfParts.push(part);
  }

  public async addParts(parts: PdfPartProcessor[]): Promise<void> {
    const promises = parts.map((part) => this._pdfParts.push(part));
    await Promise.all(promises);
  }

  public async cleanParts(): Promise<void> {
    this._pdfParts = [];
  }
}