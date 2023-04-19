import { Content } from "pdfmake/interfaces";
import { RowLinesTableLayout } from "../structures";
import { PdfPartProcessor } from "./partProcessor";
// import { Localize } from "../types";

class ParameterBase extends PdfPartProcessor {


  // eslint-disable-next-line no-unused-vars
  protected async _genParameters(parameters: any[]): Promise<Content[]> {
    throw new Error("Method not implemented.");
  }

  protected async _genTableContent(): Promise<Content[]> {
    const tableContentParameters = await this._genParameters();
    const tableContent: Content[] = [
      [
        { text: this._localize.name, style: ["sub", "b", "alternate"] },
        { text: this._localize.type, style: ["sub", "b", "alternate"] },
        {
          text: this._includeExample ? this._localize.example : "",
          style: ["sub", "b", "alternate"]
        },
        {
          text: this._localize.description,
          style: ["sub", "b", "alternate"]
        },
      ],
      ...tableContentParameters
    ];
    return new Promise((resolve) => {
      resolve(tableContent);
    });
  }

  async genDef(): Promise<Content[]> {
    const tableContent = await this._genTableContent();
    const content: Content[] = [
      {
        text: `FORM DATA ${this._localize.parameters}`.toUpperCase(),
        style: ["small", "b"], margin: [0, 10, 0, 0]
      },
      {
        table: {
          headerRows: 1,
          dontBreakRows: true,
          widths: [
            "auto",
            "auto",
            this._includeExample ? "auto" : 0,
            "*"
          ],
          body: tableContent,
        },
        layout: RowLinesTableLayout,
        style: "tableMargin",
      } as Content
    ];
    return new Promise((resolve) => {
      resolve(content);
    });
  }
}

export class ParameterForm extends ParameterBase {

  protected async _genParameters(
    parameters: any[],
  ): Promise<Content[]> {
    const tableContentParameters: Content[] = [];
    Object.entries(parameters)
      .forEach(([paramName, param]) => {
        let { type } = param;
        const format = param.format === "binary" ? "(binary)" : "";
        if (type === "array") {
          type = `array of ${param.items.type}`;
        }
        tableContentParameters.push([
          { text: paramName, style: ["small", "mono"] },
          { text: type + format, style: ["small", "mono"] },
          {
            text: this._includeExample
              ? param.example
                ? param.example
                : param.examples && param.examples[0]
                  ? param.examples[0]
                  : ""
              : "",
            style: ["small"],
            margin: [0, 2, 0, 0],
          },
          {
            text: param.description,
            style: ["small"],
            margin: [0, 2, 0, 0]
          },
        ]);
      });
    return new Promise((resolve) => {
      resolve(tableContentParameters);
    });
  }
}

export class ParameterOther extends ParameterBase {

  protected async _genParameters(parameters: any[]): Promise<Content[]> {
    const tableContentParameters: Content[] = [];
    Object.keys(parameters)
      .forEach((param) => {
        const paramSchema = getTypeInfo(param.schema);
        tableContentParameters.push([
          {
            text: [
              {
                text: param.required ? "*" : "",
                style: ["small", "b", "red", "mono"]
              },
              { text: param.name, style: ["small", "mono"] },
              paramSchema.deprecated ? {
                text: `\n${this._localize.deprecated}`,
                style: ["small", "red", "b"]
              } : "",
            ],
          },
          {
            stack: [
              {
                text: `${paramSchema.type === "array"
                  ? paramSchema.arrayType
                  : paramSchema.format
                    ? paramSchema.format
                    : paramSchema.type
                }`,
                style: ["small", "mono"],
              },
              paramSchema.constrain ? {
                text: paramSchema.constrain,
                style: ["small", "gray"]
              } : "",
              paramSchema.allowedValues
                ? {
                  text: [
                    {
                      text: `${this._localize.allowed}: `,
                      style: ["b", "sub"]
                    },
                    {
                      text: paramSchema.allowedValues,
                      style: ["small", "lightGray"]
                    },
                  ],
                }
                : "",
              paramSchema.pattern
                ? {
                  text: `${this._localize.pattern}: ${paramSchema.pattern}`,
                  style: ["small", "gray"]
                }
                : "",
            ],
          },
          {
            text: this._includeExample
              ? param.example
                ? param.example
                : param.examples && param.examples[0]
                  ? param.examples[0]
                  : ""
              : "",
            style: ["small"],
            margin: [0, 2, 0, 0],
          },
          {
            text: param.description,
            style: ["small"],
            margin: [0, 2, 0, 0]
          },
        ]);
      });
    return new Promise((resolve) => {
      resolve(tableContentParameters);
    });
  }
}