import { IRavageConfig } from "../../config/config";
import { RavageModuleNode } from "../moduleNode";


export abstract class RavageStyleBase extends RavageModuleNode {

  protected _styles: RavageStyleBase[];

  constructor(conf: IRavageConfig) {
    super(conf);
    this._styles = [] as RavageStyleBase[];
  }
}

export class RavageStyleV1 extends RavageStyleBase {

}