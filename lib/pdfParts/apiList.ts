import { Content, ContentStack, ContentTable } from "pdfmake/interfaces";
import { PdfPartProcessor } from "./partProcessor";
import { OpenapiInfoV3, RowLinesTableLayout } from "../structures";
import { IRavageOptions } from "../types/options";
import { RavageLocalizeEnum } from "../types";


export class PdfPartApiList extends PdfPartProcessor {

  /**
   * 
   * @returns 
   */
  async genDef(
    openapiTree: OpenapiInfoV3,
    options?: IRavageOptions
  ): Promise<Content> {
    const content: Content[] = [
      {
        text: options?.localize?.apiList ?? RavageLocalizeEnum.API_LIST,
        style: ["h3", "b"],
        pageBreak: "before"
      }
    ];

    Object.entries(openapiTree.tagsToPaths)
      .forEach(([tag, paths]) => {
        const tableContent = [
          [
            {
              text: options?.localize?.method ?? RavageLocalizeEnum.METHOD,
              style: ["small", "b"]
            },
            {
              text: options?.localize?.api ?? RavageLocalizeEnum.API,
              style: ["small", "b"]
            },
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