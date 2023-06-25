import { RavageModuleNode } from "../moduleNode";


export abstract class RavageFontBase extends RavageModuleNode {


  // eslint-disable-next-line no-unused-vars
  public abstract addFont(path: string): Promise<void>;
}

export class RavageFontV1 extends RavageFontBase {
  public addFont(path: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

}