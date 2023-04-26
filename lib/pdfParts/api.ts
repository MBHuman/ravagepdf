import { Content } from "pdfmake/interfaces";
import { PdfPartProcessor } from "./partProcessor";

export class PdfPartApi extends PdfPartProcessor {

  /**
   * TODO: #2 Add PdfPartApi class for build main api part in pdf
   * @returns 
   */
  async genDef(): Promise<Content> {
    const content = [
      { text: this._localize.api, style: ["h2", "b"] }
    ];
    return new Promise((resolve) => {
      resolve(content);
    });
  }
}