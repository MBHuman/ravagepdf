import { RavageModule } from "./module";


export class RavageModuleComposite extends RavageModule {

  public addModule(module: RavageModule): Promise<void> {
    throw new Error("Method not implemented");
  }
}