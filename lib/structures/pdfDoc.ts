import {
  PdfPartApiList,
  PdfPartSecurity,
  PdfPartInfo
} from "../pdfParts";
import { writeFileSync } from "fs";
import {
  Content, TDocumentDefinitions,
  StyleDictionary,
} from "pdfmake/interfaces";
import { PdfPartToc } from "../pdfParts/toc";
import { PdfPartPaths } from "../pdfParts/paths";
import { TCreatedPdf, createPdf } from "pdfmake/build/pdfmake";
import { RobotoVFS } from "../fonts/roboto";
import { PdfPartBuilder } from "../pdfParts/partBuilder";
import { OpenAPI } from "openapi-types";
import { IRavageOptions } from "../types/options";
import { RavageStyle } from "../types/style";

/**
 * PDFDoc is class that builds pdf document from OpenAPI specification.
 *
 */
export class PDFDoc {
  private _pdfPartsBuilder: PdfPartBuilder;
  private _allContent: Content;
  private _options: IRavageOptions;
  private _documentDef: TDocumentDefinitions;
  private _doc: TCreatedPdf;

  constructor(options?: IRavageOptions) {
    this._allContent = [];
    this._options = options ?? {};
    this._doc = {} as TCreatedPdf;
    this._pdfPartsBuilder = new PdfPartBuilder(
      this._options
    );

    const style = {
      ...RavageStyle,
      ...options?.style
    } as StyleDictionary;

    this._options.style = style;

    this._documentDef = {
      footer: this._footer,
      content: [] as Content[],
      styles: this._options?.style as StyleDictionary,
      defaultStyle: {
        fontSize: 12,
        font: "Roboto",
      },
    };
  }

  // :TODO #10 add localize.footer text to _footer method
  private _footer(currentPage: number, pageCount: number): Content {
    return {
      margin: 10,
      columns: [
        {
          text: "",
          style: ["sub", "gray", "left"]
        },
        {
          text: `${currentPage} of ${pageCount}`,
          style: ["sub", "gray", "right"],
        },
      ],
    } as Content;
  }

  /**
   * Build pdf doc by PdfParts
   * 
   * @param api 
   * @returns 
   */
  public async build(api: string | OpenAPI.Document): Promise<PDFDoc> {
    await this._pdfPartsBuilder.cleanParts();
    await this._pdfPartsBuilder.addParts([
      new PdfPartInfo(),
      new PdfPartToc(),
      new PdfPartPaths(),
      new PdfPartSecurity(),
      new PdfPartApiList(),
    ]);
    this._allContent = await this._pdfPartsBuilder.buildParts(api);
    this._documentDef.content = this._allContent;
    this._doc = createPdf(this._documentDef, undefined, undefined, RobotoVFS);
    return new Promise((resolve) => {
      resolve(this);
    });
  }

  /**
   * Writes pdf doc to file
   * 
   * @param filePath 
   * @returns 
   */
  public async writeToFile(
    filePath: string
  ): Promise<void> {
    this._doc.getBuffer((data) => {
      writeFileSync(filePath, data);
    });
    return new Promise((resolve) => {
      resolve();
    });
  }
}