import { OpenAPIV3 } from "openapi-types";
import { Content } from "pdfmake/interfaces";
import { DescriptionBuilder } from "./descriptionBuilder";
import { Localize } from "../types";
import { PropDescription } from "../types/propDescription";

abstract class MediaTreeBuilderBase {

  protected _descriptionBuilder: DescriptionBuilder;
  protected _localize: Localize;

  constructor(localize: Localize) {
    this._localize = localize;
    this._descriptionBuilder = new DescriptionBuilder(
      localize
    );
  }

  public abstract build(
    // eslint-disable-next-line no-unused-vars
    obj: OpenAPIV3.MediaTypeObject
  ): Promise<Content>;
}

export class MediaTreeBuilder extends MediaTreeBuilderBase {
  public async build(obj?: OpenAPIV3.MediaTypeObject): Promise<Content> {
    if (!obj) {
      // const descrStack = this._descriptionBuilder.genProp(obj);
    }
    throw new Error("Method not implemented");
  }
}