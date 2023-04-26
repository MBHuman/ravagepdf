import { Localize } from "../../types";


export abstract class ReqResBuilder {
  protected _localize: Localize;
  constructor(localize: Localize) {
    this._localize = localize;
  }
}