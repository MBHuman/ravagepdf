

export interface IRavageExtension {
    build(): Promise<void>;
    writeToFile(): Promise<void>;
}

export abstract class RavageExtensionBase implements IRavageExtension {
    public abstract build(): Promise<void>;
    public abstract writeToFile(): Promise<void>;
}

export class RavageExtensionV1 extends RavageExtensionBase {
  public build(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  public writeToFile(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}