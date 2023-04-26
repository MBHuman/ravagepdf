import { Content } from "pdfmake/interfaces";
import { PdfPartProcessor } from "./partProcessor";

// :TODO #5 implement PdfPartRequest
export class PdfPartRequest extends PdfPartProcessor {

  genDef(): Promise<Content> {
    throw new Error("Method not implemented.");
  }
}

// export async function getRequest(): Promise<Content[]> {
//   let content: Content[];

//   return new Promise((resolve) => {
//     resolve(content);
//   });
// }