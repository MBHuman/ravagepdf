import { IRavageModule } from "./module";


export interface IRavageModuleCache {
    checkInCache(): boolean;
}

export abstract class RavageModuleCacheBase implements IRavageModuleCache {
  protected _usedModules: Set<IRavageModule>;

  constructor() {
    this._usedModules = new Set<IRavageModule>();
  }

    public abstract checkInCache(): boolean;
}

export class RavageModuleCacheV1 extends RavageModuleCacheBase {
  public checkInCache(): boolean {
    throw new Error("Method not implemented.");
  }
}