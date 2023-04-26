import { Content } from "pdfmake/interfaces";
import { PdfPartProcessor } from "./partProcessor";

// :TODO #6 Implement PdfPartResponse
export class PdfPartResponse extends PdfPartProcessor {

  async genDef(): Promise<Content> {
    throw new Error("Method not implemented.");
  }
}