import { Content, ContentTable } from "pdfmake/interfaces";
import { PdfPartProcessor } from "./partProcessor";
import { OpenAPIV3 } from "openapi-types";
import { RowLinesTableLayout } from "../structures";

export class PdfPartSecurity extends PdfPartProcessor {

  private async _genTableContent(): Promise<Content[]> {
    let tableContent = [] as Content[];
    if (!this._openapiTree.components.securitySchemes) {
      return new Promise((resolve) => {
        resolve(tableContent);
      });
    }
    tableContent = [
      [
        { text: this._localize.key, style: ["small", "b"] },
        { text: this._localize.type, style: ["small", "b"] },
        { text: this._localize.description, style: ["small", "b"] },
      ]
    ];
    Object.entries(this._openapiTree.components.securitySchemes as
      Record<string, OpenAPIV3.HttpSecurityScheme>)
      .forEach(([key, val]) => {
        tableContent.push([
          key,
          val.type +
          (val.scheme ? `, ${val.scheme}` : "") +
          (val.bearerFormat ? `, ${val.bearerFormat}` : ""),
          ""
          // val.description ? val.description : "",
        ] as Content[]);
      });

    return new Promise((resolve) => {
      resolve(tableContent);
    });
  }

  async genDef(): Promise<Content> {
    let content = [] as Content[];
    if (!this._openapiTree.components.securitySchemes) {
      return new Promise((resolve) => {
        resolve(content);
      });
    }
    const tableContent = await this._genTableContent();

    content = [
      {
        text: this._localize.securityAndAuthentication,
        style: ["h3", "b", "primary", "right", "topMargin3"]
      },
      {
        text: this._localize.securitySchemes,
        style: ["b", "tableMargin"]
      },
    ];
    content.push({
      table: {
        headerRows: 1,
        body: tableContent,
      },
      layout: RowLinesTableLayout,
      style: "tableMargin",
      pageBreak: "after",
    } as ContentTable);
    return new Promise((resolve) => {
      resolve(content);
    });
  }
}

export class PdfPartSecurityEmpty extends PdfPartProcessor {

  genDef(): Promise<Content[]> {
    const content: Content[] = [];
    return new Promise((resolve) => {
      resolve(content);
    });
  }
}
