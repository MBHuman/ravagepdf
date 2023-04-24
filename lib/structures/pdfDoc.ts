import { PdfStyle } from "../types/pdfStyle";
import { PdfOptions } from "../types/pdfOptions";
import { OpenapiInfoV3 } from "./openapiInfo";
import { PdfPartInfo, PdfPartProcessor } from "../pdfParts";
import { writeFileSync } from "fs";
import {
  Content, TDocumentDefinitions,
  StyleDictionary
} from "pdfmake/interfaces";
import PdfPrinter from "pdfmake";

/**
 * PDFDoc is class that builds pdf document from OpenAPI specification.
 *
 */
export class PDFDoc {
  private _pdfParts: PdfPartProcessor[];
  private _allContent: Content[];
  private _styles: PdfStyle;
  private _options: PdfOptions;
  private _openapiTree: OpenapiInfoV3;
  private _documentDef: TDocumentDefinitions;
  private _doc: PDFKit.PDFDocument;

  constructor(styles: PdfStyle, options: PdfOptions) {
    this._pdfParts = [];
    this._allContent = [];
    this._styles = styles;
    this._options = options;
    this._openapiTree = new OpenapiInfoV3();
    this._doc = {} as PDFKit.PDFDocument;


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

  private async _parseAndBuildTree(api: string): Promise<void> {
    await this._openapiTree.parseAndBuild(api);
  }

  private async _addPart(pdfPart: PdfPartProcessor): Promise<void> {
    return new Promise((resolve) => {
      this._pdfParts.push(pdfPart);
      resolve();
    });
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
    await this._addPart(
      new PdfPartInfo(this._openapiTree, this._options.localize, true)
    );
    await this._parseAndBuildTree(api);
    for (const part of this._pdfParts) {
      this._allContent.push(await part.genDef());
    }
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