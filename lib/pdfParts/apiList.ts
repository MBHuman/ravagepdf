import { Content } from "pdfmake/interfaces";
import { PdfPartProcessor } from "./partProcessor";
import { RowLinesTableLayout } from "../structures";


export class PdfPartApiList extends PdfPartProcessor {

  private async _genTableContent(tag: string): Promise<Content[]> {
    // const tableContent: Content[] = [
    //   [
    //     { text: this._localize.method, style: ["small", "b"] },
    //     { text: this._localize.api, style: ["small", "b"] },
    //   ],
    // ];
    // Object.keys(tag.paths)
    //   .forEach((path) => {
    //     tableContent.push([
    //       { text: path.method, style: ["small", "mono", "right"] },
    //       {
    //         margin: [0, 0, 0, 2],
    //         stack: [
    //           { text: path.path, style: ["small", "mono"] },
    //           { text: path.summary, style: ["small", "gray"] },
    //         ],
    //       },
    //     ]);
    //   });
    // return new Promise((resolve) => {
    //   resolve(tableContent);
    // });
    throw new Error("Not implemented");
  }

  private async _genContent(): Promise<Content[]> {
    // const content: Content[] = [];
    // Object.entries(spec.tags).forEach(async ([tag, i]) => {
    //   const tableContent = await this._genTableContent(tag);
    //   content.push(
    //     {
    //       text: tag.name,
    //       style: ["h6", "b", "primary", "tableMargin"],
    //       pageBreak: i === 0 ? "none" : "after"
    //     },
    //     { text: tag.description, style: ["p"] },
    //     {
    //       table: {
    //         headerRows: 1,
    //         dontBreakRows: true,
    //         widths: ["auto", "*"],
    //         body: tableContent,
    //       },
    //       layout: RowLinesTableLayout,
    //       style: "tableMargin",
    //     }
    //   );
    // });
    // return new Promise((resolve) => {
    //   resolve(content);
    // });
    throw new Error("Not implemented");
  }


  async getDef(): Promise<Content[]> {
    // const additionalContent = await this._genContent();
    // const content: Content[] = [
    //   {
    //     text: sectionHeading,
    //     style: ["h3", "b"],
    //     pageBreak: undefined
    //   },
    //   ...additionalContent
    // ];
    // return new Promise((resolve) => {
    //   resolve(content);
    // });
    throw new Error("Not implemented");
  }
}