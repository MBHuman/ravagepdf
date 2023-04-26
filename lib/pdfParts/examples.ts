import { Content } from "pdfmake/interfaces";
import { PdfPartProcessor } from "./partProcessor";

/**
 * :TODO #7 Implement PdfPartExamples
 */
export class PdfPartExamples extends PdfPartProcessor {
  async getDef(): Promise<Content> {
    // const exampleSection: Content[] = [];
    // if (contentTypeObj.example) {
    //   exampleSection.push([
    //     {
    //       text: `${this._localize.example}:`,
    //       margin: [20, 10, 0, 0], style: ["small", "b"]
    //     },
    //     {
    //       text: JSON.stringify(
    //         contentTypeObj.example,
    //         null,
    //         "\u200B \u200B"
    //       ),
    //       margin: [40, 10, 0, 0],
    //       style: "monoSub"
    //     },
    //   ]);
    // }
    // if (contentTypeObj.examples) {
    //   let iterCount = 0;
    //   for (const oneExample in contentTypeObj.examples) {
    //     exampleSection.push([
    //       {
    //         text: `${this._localize.example} ${++iterCount}:`,
    //         margin: [20, 10, 0, 0], style: ["small", "b"]
    //       },
    //       {
    //         text: JSON.stringify(
    //           oneExample,
    //           null,
    //           2),
    //         margin: [40, 10, 0, 0],
    //         style: "monoSub"
    //       },
    //     ]);
    //   }
    // }

    // return new Promise((resolve) => {
    //   resolve(exampleSection);
    // });
    throw new Error("Method not implemented.");
  }
}