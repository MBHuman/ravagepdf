import { Content, ContentStack, ContentTable } from "pdfmake/interfaces";
import { PdfPartProcessor } from "./partProcessor";
import { RowLinesTableLayout } from "../structures";


export class PdfPartApiList extends PdfPartProcessor {

  /**
   * :TODO fix incorrect render of table with styles
   * @returns 
   */
  async genDef(): Promise<Content> {
    const content: Content[] = [
      {
        text: this._localize.apiList,
        style: ["h3", "b"],
        pageBreak: "before"
      }
    ];

    Object.entries(this._openapiTree.tagsToPaths)
      .forEach(([tag, paths], i) => {
        const tableContent = [
          [
            { text: this._localize.method, style: ["small", "b"] },
            { text: this._localize.api, style: ["small", "b"] },
          ],
        ] as Content[];
        paths.map((path) => {
          tableContent.push([
            {
              text: path.method,
              style: ["small", "mono", "right"]
            },
            {
              margin: [0, 0, 0, 2],
              stack: [
                { text: path.path, style: ["small", "mono"] },
                { text: path.summary, style: ["small", "gray"] },
              ],
            } as ContentStack,
          ]);
        });

        content.push(
          {
            text: tag,
            style: ["h6", "b", "primary", "tableMargin"],
            pageBreak: i === 0 ? "before" : "after"
          },
          { text: "", style: ["p"] },
          {
            table: {
              headerRows: 1,
              dontBreakRows: true,
              widths: ["auto", "*"],
              body: tableContent,
            },
            layout: RowLinesTableLayout,
            style: "tableMargin",
          } as ContentTable
        );
      });
    return new Promise((resolve) => {
      resolve(content);
    });
  }
}