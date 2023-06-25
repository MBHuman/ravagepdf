import { RavageConfigBase } from "../config/config";


export interface IRavageModule {

  // eslint-disable-next-line no-unused-vars
  set config(conf: RavageConfigBase);

  get config(): RavageConfigBase;
}

export class RavageModule implements IRavageModule {

  private _config: RavageConfigBase;

  constructor(config: RavageConfigBase) {
    this._config = config;
  }

  set config(conf: RavageConfigBase) {
    this._config = conf;
  }
  get config(): RavageConfigBase {
    return this._config;
  }

}