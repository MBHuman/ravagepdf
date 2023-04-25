import { Content, ContentToc } from "pdfmake/interfaces";
import { PdfPartProcessor } from "./partProcessor";


export class PdfPartToc extends PdfPartProcessor {


  async genDef(): Promise<Content[]> {
    const content = [{
      toc: {
        title: { text: this._localize.index, style: ["b", "h2"] },
        numberStyle: { bold: true },
        style: ["small"],
      },
      pageBreak: "after",
    } as ContentToc] as Content[];
    return new Promise((resolve) => {
      resolve(content);
    });
  }
}