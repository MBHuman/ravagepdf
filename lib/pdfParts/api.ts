import { Content } from "pdfmake/interfaces";
import { PdfPartProcessor } from "./partProcessor";

export class PdfPartApi extends PdfPartProcessor {


  async genDef(): Promise<Content> {
    const content = [
      { text: this._localize.api, style: ["h2", "b"] }
    ];
    return new Promise((resolve) => {
      resolve(content);
    });
  }
}