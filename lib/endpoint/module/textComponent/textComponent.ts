import { IRavageConfig } from "../../config/config";
import { RavageModuleNode } from "../moduleNode";
import {
  RavageTextExtensionComposite
} from "../textExtension/textExtensionComposite";


export abstract class RavageTextComponentBase extends RavageModuleNode {

  protected _textExtensionComposite: RavageTextExtensionComposite;

  constructor(conf: IRavageConfig) {
    super(conf);
    this._textExtensionComposite = new RavageTextExtensionComposite(conf);
  }

  // eslint-disable-next-line no-unused-vars
  public abstract processText(text: string): Promise<void>;
}

export class RavageTextComponentV1 extends RavageTextComponentBase {
  public processText(text: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}