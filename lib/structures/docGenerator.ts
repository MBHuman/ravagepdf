import { OpenAPI } from "openapi-types";
import { PDFDoc } from "./pdfDoc";
import { IRavageOptions } from "../types/options";
import { StyleDictionary } from "pdfmake/interfaces";

/**
 * Class to generate PDF from OpenAPI definition.
 */
export class DocGeneratorPDF {

  private _options: IRavageOptions;
  private _pdfDoc: PDFDoc;

  constructor(options?: IRavageOptions) {
    this._options = options ?? {};
    this._pdfDoc = new PDFDoc(this._options);
  }

  /**
   * setter for pdfStyles
   */
  public set pdfStyles(style: StyleDictionary) {
    this._options.style = style;
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
  public async createPdf(api: string | OpenAPI.Document): Promise<PDFDoc> {
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

  /**
   * Method to create and write 
   * 
   * @param api 
   * @param file 
   * @returns 
   */
  public async createPdfAndWriteToFile(
    api: string | OpenAPI.Document,
    file: string
  ): Promise<void> {
    const doc = await this._pdfDoc.build(api);
    await doc.writeToFile(file);
    return new Promise((resolve) => {
      resolve();
    });
  }
}