import { IRavageConfig } from "../../config/config";
import { RavageComponentBase } from "../component/component";
import { RavageModuleNode } from "../moduleNode";


export abstract class RavageTemplateBase extends RavageModuleNode {
  protected _components: RavageComponentBase[];

  constructor(conf: IRavageConfig) {
    super(conf);
    this._components = [] as RavageComponentBase[];
  }
}

export class RavageTemplateV1 extends RavageTemplateBase {

}