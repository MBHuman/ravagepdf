import { Content } from "pdfmake/interfaces";
import { Localize } from "../types";
import { PropDescription } from "../types/propDescription";


abstract class DescriptionBuilderBase {
  protected _localize: Localize;

  constructor(localize: Localize) {
    this._localize = localize;
  }
  protected abstract _genReadOrWrite(
    // eslint-disable-next-line no-unused-vars
    text?: string
  ): Promise<Content>;

  protected abstract _genConstraints(
    // eslint-disable-next-line no-unused-vars
    text?: string
  ): Promise<Content>;

  protected abstract _genDefault(
    // eslint-disable-next-line no-unused-vars
    text?: string
  ): Promise<Content>;

  protected abstract _genAllowed(
    // eslint-disable-next-line no-unused-vars
    text?: string
  ): Promise<Content>;

  protected abstract _genPattern(
    // eslint-disable-next-line no-unused-vars
    text?: string
  ): Promise<Content>;

  protected abstract _genName(
    // eslint-disable-next-line no-unused-vars
    text?: string
  ): Promise<Content>;

  // eslint-disable-next-line no-unused-vars
  public abstract genProp(prop: PropDescription): Promise<Content>;
}

export class DescriptionBuilder extends DescriptionBuilderBase {

  protected async _genReadOrWrite(
    text?: string
  ): Promise<Content> {
    return text ? {
      text: text,
      style: ["sub", "b", "darkGray"],
      margin: [0, 3, 0, 0],
    } as Content : {} as Content;
  }
  protected async _genConstraints(
    text?: string
  ): Promise<Content> {
    return text ? {
      text: text,
      style: ["small", "mono", "darkGray"],
    } as Content : {} as Content;
  }
  protected async _genDefault(
    text?: string
  ): Promise<Content> {
    return text ? {
      text: [
        { text: `${this._localize.default}:`, style: ["sub", "b", "darkGray"] },
        { text: text, style: ["small", "darkGray", "mono"] },
      ],
    } as Content : {} as Content;
  }
  protected async _genAllowed(
    text?: string
  ): Promise<Content> {
    return text ? {
      text: [
        { text: `${this._localize.allowed}:`, style: ["sub", "b", "darkGray"] },
        { text: text, style: ["small", "lightGray", "mono"] },
      ],
    } as Content : {} as Content;
  }
  protected async _genPattern(
    text?: string
  ): Promise<Content> {
    return text ? {
      text: [
        { text: `${this._localize.pattern}:`, style: ["sub", "b", "darkGray"] },
        { text: text, style: ["small", "lightGray", "mono"] },
      ],
    } as Content : {} as Content;
  }
  protected async _genName(
    text?: string
  ): Promise<Content> {
    return text ? {
      text: text,
      style: ["sub", "lightGray"],
      margin: [0, 3, 0, 0],
    } as Content : {} as Content;
  }

  public async genProp(prop: PropDescription): Promise<Content> {
    return [
      await this._genReadOrWrite(prop.setReadOrWriteOnly),
      await this._genConstraints(prop.setConstraints),
      await this._genDefault(prop.setDefault),
      await this._genAllowed(prop.setAllowed),
      await this._genPattern(prop.setPattern),
      await this._genName(prop.name),
    ] as Content;
  }
}