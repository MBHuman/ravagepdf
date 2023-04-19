import { PdfOptions } from "../types";
import { PdfStyle } from "../types/pdfStyle";
import { PDFDoc } from "./pdfDoc";

export class DocGenerator {

  private _pdfStyle?: PdfStyle;
  private _doc: PDFDoc;

  constructor(pdfStyles?: PdfStyle, pdfOptions?: PdfOptions) {
    this._pdfStyle = pdfStyles;
    this._doc = new PDFDoc(pdfStyles, pdfOptions);
  }

  set pdfStyles(style: PdfStyle) {
    this._pdfStyle = style;
  }

  /**
   *
   * @param api An OpenAPI definition, or the file path or URL of an OpenAPI
   * definition. The path can be absolute or relative. In Node, the path is
   * relative to process.cwd(). In the browser, it's relative to the URL of
   * the page.
   */
  async createPdf(api: string): Promise<void> {
    await this._doc.build(api);
  }

  async writeToFile(file: string): Promise<void> {
    console.log();
  }
}