import { Content } from "pdfmake/interfaces";


export abstract class MethodPartProcessor {

  protected _localize: string;

  constructor(localize: string) {
    this._localize = localize;
  }

  public abstract processPart(): Promise<Content>;


}