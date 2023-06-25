import { IRavageConfig } from "../../config/config";
import {
  RavageLocalizationBase,
  RavageLocalizationV1,
} from "../localization/localization";
import { RavageModuleNode } from "../moduleNode";
import { RavageStructureBase, RavageStructureV1 } from "../structure/structure";
import { RavageStyleBase, RavageStyleV1 } from "../style/style";

export abstract class RavageComponentBase extends RavageModuleNode {
  protected _localization: RavageLocalizationBase;
  protected _style: RavageStyleBase;
  protected _structure: RavageStructureBase;

  constructor(conf: IRavageConfig) {
    super(conf);
    this._localization = new RavageLocalizationV1(conf);
    this._style = new RavageStyleV1(conf);
    this._structure = new RavageStructureV1(conf);
  }
}

export class RavageComponentV1 extends RavageComponentBase {

}
