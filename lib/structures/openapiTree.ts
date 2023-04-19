

export class OpenapiTree {
  private _tree: string;
  constructor() {
    this._tree = "";
  }
  async parseAndBuild(api: string): Promise<void> {
    console.log(api);

  }

  getTypeInfo(): void {
    console.log();

  }
  generatePropDescription(): void {
    console.log();

  }
  schemaInObjectNotation(): void {
    console.log();
  }
  objectToTree(): void {
    console.log();
  }
  objectToTableTree(): void {
    console.log();
  }
}