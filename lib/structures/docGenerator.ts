import { PdfOptions } from "../types";
import { PdfStyle } from "../types/pdfStyle";
import { PDFDoc } from "./pdfDoc";

/**
 * Class to generate PDF from OpenAPI definition.
 */
export class DocGeneratorPDF {

  private _pdfStyle: PdfStyle;
  private _pdfOptions: PdfOptions;
  private _pdfDoc: PDFDoc;

  constructor(pdfStyle: PdfStyle, pdfOptions: PdfOptions) {
    this._pdfStyle = pdfStyle;
    this._pdfOptions = pdfOptions;
    this._pdfDoc = new PDFDoc(this._pdfStyle, this._pdfOptions);
  }

  /**
   * setter for pdfStyles
   */
  public set pdfStyles(style: PdfStyle) {
    this._pdfStyle = style;
  }

  /**
   * Method to build pdf from OpenAPI definition and returns promise with
   * PDFKit.PDFDocument inside
   * 
   * @param api An OpenAPI definition, or the file path or URL of an OpenAPI
   * definition. The path can be absolute or relative. In Node, the path is
   * relative to process.cwd(). In the browser, it's relative to the URL of
   * the page.
   */
  public async createPdf(api: string): Promise<PDFDoc> {
    const doc = await this._pdfDoc.build(api);
    return new Promise((resolve) => {
      resolve(doc);
    });
  }

  /**
   * Method to write the PDFKit.PDFDocument to *.pdf file
   * 
   * @param file The file path to write the PDF
   */
  public async writeToFile(
    pdfDocument: PDFDoc,
    file: string
  ): Promise<void> {
    await pdfDocument.writeToFile(file);
    return new Promise((resolve) => {
      resolve();
    });
  }

  public async createPdfAndWriteToFile(
    api: string,
    file: string
  ): Promise<void> {
    const doc = await this._pdfDoc.build(api);
    await doc.writeToFile(file);
    return new Promise((resolve) => {
      resolve();
    });
  }
}