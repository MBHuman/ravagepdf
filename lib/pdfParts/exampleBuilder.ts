import { Content } from "pdfmake/interfaces";
import { Localize, PdfStyle } from "../types";
import { OpenAPIV3 } from "openapi-types";


abstract class ExampleBuilderBase {

  protected _localize: Localize;
  protected _pdfStyle: PdfStyle;

  constructor(
    localize: Localize,
    pdfStyle: PdfStyle
  ) {
    this._localize = localize;
    this._pdfStyle = pdfStyle;
  }

  public abstract genExample(
    // eslint-disable-next-line no-unused-vars
    schema: OpenAPIV3.SchemaObject
  ): Promise<Content>;
}

export class ExampleBuilder extends ExampleBuilderBase {

  public async genExample(
    schema: OpenAPIV3.SchemaObject
  ): Promise<Content> {
    throw new Error("Method not implemented");
  }
}