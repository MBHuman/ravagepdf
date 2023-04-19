import { Content } from "pdfmake/interfaces";
import { PdfPartProcessor } from "./partProcessor";

export class PdfPartExamples extends PdfPartProcessor {
  getDef(): Promise<Content[]> {
    const exampleSection: Content[] = [];
    if (contentTypeObj.example) {
      exampleSection.push([
        {
          text: `${localizedExampleLabel}:`,
          margin: [20, 10, 0, 0], style: ["small", "b"]
        },
        {
          text: JSON.stringify(
            contentTypeObj.example,
            null,
            "\u200B \u200B"
          ),
          margin: [40, 10, 0, 0],
          style: "monoSub"
        },
      ]);
    }
    if (contentTypeObj.examples) {
      let iterCount = 0;
      for (const oneExample in contentTypeObj.examples) {
        exampleSection.push([
          {
            text: `${localizedExampleLabel} ${++iterCount}:`,
            margin: [20, 10, 0, 0], style: ["small", "b"]
          },
          {
            text: JSON.stringify(
              oneExample,
              null,
              2),
            margin: [40, 10, 0, 0],
            style: "monoSub"
          },
        ]);
      }
    }

    return new Promise((resolve) => {
      resolve(exampleSection);
    });
  }
}