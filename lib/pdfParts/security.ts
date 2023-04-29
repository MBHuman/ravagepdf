import { Content, ContentTable } from "pdfmake/interfaces";
import { PdfPartProcessor } from "./partProcessor";
import { OpenAPIV3 } from "openapi-types";
import { OpenapiInfoV3, RowLinesTableLayout } from "../structures";
import { Localize } from "../types";

export class PdfPartSecurity extends PdfPartProcessor {

  private async _genTableContent(
    openapiTree: OpenapiInfoV3,
    localize: Localize,
    // eslint-disable-next-line no-unused-vars
    includeExample?: boolean
  ): Promise<Content[]> {
    let tableContent = [] as Content[];
    if (!openapiTree.components.securitySchemes) {
      return new Promise((resolve) => {
        resolve(tableContent);
      });
    }
    tableContent = [
      [
        { text: localize.key, style: ["small", "b"] },
        { text: localize.type, style: ["small", "b"] },
        { text: localize.description, style: ["small", "b"] },
      ]
    ];
    Object.entries(openapiTree.components.securitySchemes as
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

  async genDef(
    openapiTree: OpenapiInfoV3,
    localize: Localize,
    includeExample?: boolean
  ): Promise<Content> {
    let content = [] as Content[];
    if (!openapiTree.components.securitySchemes) {
      return new Promise((resolve) => {
        resolve(content);
      });
    }
    const tableContent = await this._genTableContent(
      openapiTree,
      localize,
      includeExample
    );

    content = [
      {
        text: localize.securityAndAuthentication,
        style: ["h3", "b", "primary", "right", "topMargin3"]
      },
      {
        text: localize.securitySchemes,
        style: ["b", "tableMargin"]
      },
    ];
    content.push({
      table: {
        headerRows: 1,
        body: tableContent,
      },
      layout: RowLinesTableLayout,
      style: "tableMargin"
    } as ContentTable);
    return new Promise((resolve) => {
      resolve(content);
    });
  }
}

export class PdfPartSecurityEmpty extends PdfPartProcessor {

  async genDef(
    // eslint-disable-next-line no-unused-vars
    openapiTree: OpenapiInfoV3,
    // eslint-disable-next-line no-unused-vars
    localize: Localize,
    // eslint-disable-next-line no-unused-vars
    includeExample?: boolean
  ): Promise<Content> {
    const content: Content[] = [];
    return new Promise((resolve) => {
      resolve(content);
    });
  }
}
