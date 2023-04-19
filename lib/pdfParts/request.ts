import { Content } from "pdfmake/interfaces";
import { PdfPartProcessor } from "./partProcessor";

export class PdfPartRequest extends PdfPartProcessor {

  genDef(): Promise<Content[]> {
    throw new Error("Method not implemented.");
  }
}

export async function getRequest(): Promise<Content[]> {
  let content: Content[];

  return new Promise((resolve) => {
    resolve(content);
  });
}