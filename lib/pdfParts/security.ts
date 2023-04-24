import { Content } from "pdfmake/interfaces";
import { PdfPartProcessor } from "./partProcessor";
import { RowLinesTableLayout } from "../structures";

export class PdfPartSecurity extends PdfPartProcessor {

  private async _genTableContent(): Promise<Content[]> {
    //   const tableContent: Content[] = [
    //     [
    //       { text: localize.key, style: ["small", "b"] },
    //       { text: localize.type, style: ["small", "b"] },
    //       { text: localize.description, style: ["small", "b"] },
    //     ],
    //   ];
    //   Object.entries(spec.securitySchemes)
    //     .forEach(([key, value]) => {
    //       tableContent.push([
    //         key,
    //         value.type +
    //         (value.scheme ? `, ${value.scheme}` : "") +
    //         (value.bearerFormat ? `, ${value.bearerFormat}` : ""),
    //       ] as Content);
    //     });

    //   return new Promise((resolve) => {
    //     resolve(tableContent);
    //   });
    // }

    // async genDef(): Promise<Content[]> {
    //   const tableContent = await this._genTableContent();
    //   const content: Content[] = [
    //     {
    //       text: localize.securityAndAuthentication,
    //       style: ["h3", "b", "primary", "right", "topMargin3"]
    //     },
    //     {
    //       text: localize.securitySchemes,
    //       style: ["b", "tableMargin"]
    //     },
    //     {
    //       table: {
    //         headerRows: 1,
    //         body: tableContent,
    //       },
    //       layout: RowLinesTableLayout,
    //       style: "tableMargin",
    //       pageBreak: "after"
    //     } as Content,
    //   ];

    //   return new Promise((resolve) => {
    //     resolve(content);
    //   });
    throw new Error("Method not implemented.");
  }
}

export class PdfPartSecurityEmpty extends PdfPartProcessor {

  genDef(): Promise<Content[]> {
    // const content: Content[] = [];
    // return new Promise((resolve) => {
    //   resolve(content);
    // });
    throw new Error("Method not implemented.");
  }
}
