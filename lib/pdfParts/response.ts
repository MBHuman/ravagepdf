import { Content } from "pdfmake/interfaces";
import { PdfPartProcessor } from "./partProcessor";

export class PdfPartResponse extends PdfPartProcessor {

  genDef(): Promise<Content[]> {
    throw new Error("Method not implemented.");
  }
}