import { PdfStyle } from "../types/pdfStyle";
import { PdfOptions } from "../types/pdfOptions";
import {
  PdfPartApiList,
  PdfPartInfo,
  PdfPartSecurity,
  PdfPartBuilder
} from "../pdfParts";
import { writeFileSync } from "fs";
import {
  Content, TDocumentDefinitions,
  StyleDictionary
} from "pdfmake/interfaces";
import PdfPrinter from "pdfmake";
import { PdfPartToc } from "../pdfParts/toc";

/**
 * PDFDoc is class that builds pdf document from OpenAPI specification.
 *
 */
export class PDFDoc {
  private _pdfPartsBuilder: PdfPartBuilder;
  private _allContent: Content;
  private _styles: PdfStyle;
  private _options: PdfOptions;
  private _documentDef: TDocumentDefinitions;
  private _doc: PDFKit.PDFDocument;

  constructor(styles: PdfStyle, options: PdfOptions) {
    this._allContent = [];
    this._styles = styles;
    this._options = options;
    this._doc = {} as PDFKit.PDFDocument;
    this._pdfPartsBuilder = new PdfPartBuilder(
      this._options.localize,
      this._styles
    );


    this._documentDef = {
      footer: this._footer,
      content: [] as Content[],
      styles: this._styles as StyleDictionary,
      defaultStyle: {
        fontSize: 12,
        font: "Helvetica",
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


  private async _genBuffer(pdfDocument: PDFKit.PDFDocument): Promise<Buffer> {
    return new Promise((resolve) => {
      const chunks: Buffer[] = [];
      pdfDocument.on("data", function (chunk) {
        chunks.push(chunk);
      });
      pdfDocument.on("end", function () {
        resolve(Buffer.concat(chunks));
      });
      pdfDocument.end();
    });
  }

  public async build(api: string): Promise<PDFDoc> {
    await this._pdfPartsBuilder.cleanParts();
    await this._pdfPartsBuilder.addParts([
      new PdfPartInfo(),
      new PdfPartToc(),
      new PdfPartSecurity(),
      new PdfPartApiList(),
    ]);
    this._allContent = await this._pdfPartsBuilder.buildParts(api);
    this._documentDef.content = this._allContent;
    this._doc = new PdfPrinter({
      Courier: {
        normal: "Courier",
        bold: "Courier-Bold",
        italics: "Courier-Oblique",
        bolditalics: "Courier-BoldOblique",
      },
      Helvetica: {
        normal: "Helvetica",
        bold: "Helvetica-Bold",
        italics: "Helvetica-Oblique",
        bolditalics: "Helvetica-BoldOblique",
      },
    }).createPdfKitDocument(this._documentDef);
    return new Promise((resolve) => {
      resolve(this);
    });
  }

  public async writeToFile(
    filePath: string
  ): Promise<void> {
    const data = await this._genBuffer(this._doc);
    writeFileSync(filePath, data);
    return new Promise((resolve) => {
      resolve();
    });
  }
}