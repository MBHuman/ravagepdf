import { Content, ContentTable } from "pdfmake/interfaces";
import { PdfPartProcessor } from "./partProcessor";
import { OpenAPIV3 } from "openapi-types";
import { OpenapiInfoV3, RowLinesTableLayout } from "../structures";
import { RavageLocalizeEnum } from "../types";
import { IRavageOptions } from "../types/options";

/**
 * PdfPartSecurity generates pdf part for security schemas
 */
export class PdfPartSecurity extends PdfPartProcessor {

  private async _genTableContent(
    openapiTree: OpenapiInfoV3,
    options?: IRavageOptions
  ): Promise<Content[]> {
    let tableContent = [] as Content[];
    if (!openapiTree.components.securitySchemes) {
      return new Promise((resolve) => {
        resolve(tableContent);
      });
    }
    tableContent = [
      [
        {
          text: options?.localize?.key ??
            RavageLocalizeEnum.KEY,
          style: ["small", "b"]
        },
        {
          text: options?.localize?.type ??
            RavageLocalizeEnum.TYPE,
          style: ["small", "b"]
        },
        {
          text: options?.localize?.description ??
            RavageLocalizeEnum.DESCRIPTION,
          style: ["small", "b"]
        },
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
    options?: IRavageOptions
  ): Promise<Content> {
    let content = [] as Content[];
    if (!openapiTree.components.securitySchemes) {
      return new Promise((resolve) => {
        resolve(content);
      });
    }
    const tableContent = await this._genTableContent(
      openapiTree,
      options
    );

    content = [
      {
        text: options?.localize?.securityAndAuthentication ??
          RavageLocalizeEnum.SECURITY_AND_AUTHENTICATION,
        style: ["h3", "b", "primary", "right", "topMargin3"]
      },
      {
        text: options?.localize?.securitySchemes ??
          RavageLocalizeEnum.SECURITY_SCHEMES,
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
    options?: IRavageOptions
  ): Promise<Content> {
    const content: Content[] = [];
    return new Promise((resolve) => {
      resolve(content);
    });
  }
}
