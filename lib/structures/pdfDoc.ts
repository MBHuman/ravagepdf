import { PdfStyle } from "../types/pdfStyle";
import { PdfOptions } from "../types/pdfOptions";
import { Content } from "pdfmake/interfaces";
import { OpenapiTree } from "./openapiTree";

export class PDFDoc {

  private _allContent: Content[];
  private _infoDef: Content[];
  private _tocDef: Content[];
  private _securiyDef: Content[];
  private _apiListDef: Content[];
  private _apiDef: Content[];
  private _styles?: PdfStyle;
  private _options?: PdfOptions;
  private _openapiTree: OpenapiTree;

  constructor(styles?: PdfStyle, options?: PdfOptions) {
    this._allContent = [];
    this._infoDef = [];
    this._tocDef = [];
    this._securiyDef = [];
    this._apiListDef = [];
    this._apiDef = [];
    this._styles = styles;
    this._options = options;
    this._openapiTree = new OpenapiTree();
  }

  async _parseAndBuild(api: string): Promise<void> {
    await this._openapiTree.parseAndBuild(api);
  }

  async _addInfo(): Promise<void> {
    console.log();

  }

  async _addToc(): Promise<void> {
    console.log();

  }

  async _addSecurity(): Promise<void> {
    console.log();

  }

  async _addApiList(): Promise<void> {
    console.log();

  }

  async _addApi(): Promise<void> {
    console.log();

  }

  async build(api: string): Promise<void> {
    await this._addInfo();
    await this._addToc();
    await this._addSecurity();
    await this._addApiList();
    await this._addApi();
  }
}