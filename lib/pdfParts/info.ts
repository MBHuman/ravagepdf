import { Content, ContentStack } from "pdfmake/interfaces";
import { PdfPartProcessor } from "./partProcessor";
import { OpenapiInfoV3 } from "../structures";
import { Localize } from "../types";
import { markdownToPdfmake } from "../utils/markdown";

/**
 * PdfPartInfo Content block for main page of pdf document
 * that contains info from openapi info contact if it exists
 */
export class PdfPartInfo extends PdfPartProcessor {

  /**
   * Generates Content block with name from openapi file
   * 
   * @param openapiTree 
   * @param localize 
   * @returns 
   */
  private async _genName(
    openapiTree: OpenapiInfoV3,
    localize: Localize,
  ): Promise<Content> {
    let contactName = {} as Content;
    if (openapiTree.info.contact?.name) {
      contactName = {
        text: [
          { text: `\n${localize.name}: `, style: ["b", "small"] },
          { text: openapiTree.info.contact?.name, style: ["small"] },
        ],
      } as Content;
    }
    return new Promise((resolve) => {
      resolve(contactName);
    });
  }

  /**
   * Generates Content block with email from openapi file
   * 
   * @param openapiTree 
   * @param localize 
   * @returns 
   */
  private async _genEmail(
    openapiTree: OpenapiInfoV3,
    localize: Localize,
  ): Promise<Content> {
    let contactEmail = {} as Content;
    if (openapiTree.info.contact?.email) {
      contactEmail = {
        text: [
          { text: `\n${localize.email}: `, style: ["b", "small"] },
          { text: openapiTree.info.contact?.email, style: ["small"] },
        ],
      } as Content;
    }
    return new Promise((resolve) => {
      resolve(contactEmail);
    });
  }

  /**
   * Generates Content block with url from openapi file 
   * 
   * @param openapiTree 
   * @param localize 
   * @returns 
   */
  private async _genUrl(
    openapiTree: OpenapiInfoV3,
    localize: Localize,
  ): Promise<Content> {
    let contactUrl = {} as Content;

    if (openapiTree.info.contact?.url) {
      contactUrl = {
        text: [
          {
            text: `\n${localize.url}: `,
            style: ["b", "small"]
          },
          {
            text: openapiTree.info.contact?.url,
            style: ["small", "blue"],
            link: openapiTree.info.contact?.url
          },
        ],
      } as Content;
    }
    return new Promise((resolve) => {
      resolve(contactUrl);
    });
  }

  /**
   * Generates Content block with terms of service from openapi file
   * 
   * @param openapiTree 
   * @param localize 
   * @returns 
   */
  private async _genTermsOfService(
    openapiTree: OpenapiInfoV3,
    localize: Localize,
  ): Promise<Content> {
    let termsOfService = {} as Content;
    if (openapiTree.info.termsOfService) {
      termsOfService = {
        text: [
          {
            text: `\n${localize.termsOfService}: `,
            style: ["b", "small"]
          },
          {
            text: openapiTree.info.termsOfService,
            style: ["small", "blue"],
            link: openapiTree.info.termsOfService
          },
        ],
      } as Content;
    }
    return new Promise((resolve) => {
      resolve(termsOfService);
    });
  }

  /**
   * Generates Content block with description content block for main page
   * 
   * @param openapiTree 
   * @returns 
   */
  private async _genDescriptionFromMarkdown(
    openapiTree: OpenapiInfoV3,
  ): Promise<ContentStack> {
    let content = {} as ContentStack;
    if (openapiTree.info.description) {
      content = {
        stack: await markdownToPdfmake(
          openapiTree.info.description
        ) as Content[],
        style: ["topMargin3"],
      };
    }
    return new Promise((resolve) => {
      resolve(content);
    });
  }

  /**
   * Generates Content block with contact for main page from
   * openapi file
   * 
   * @param openapiTree 
   * @param localize 
   * @param includeExample 
   * @returns 
   */
  private async _genContact(
    openapiTree: OpenapiInfoV3,
    localize: Localize,
    // eslint-disable-next-line no-unused-vars
    includeExample?: boolean
  ): Promise<Content> {
    const contactDef: Content = [
      await this._genName(openapiTree, localize),
      await this._genEmail(openapiTree, localize),
      await this._genUrl(openapiTree, localize),
      await this._genTermsOfService(openapiTree, localize),
    ];
    return new Promise((resolve) => {
      resolve(contactDef);
    });
  }

  async genDef(
    openapiTree: OpenapiInfoV3,
    localize: Localize,
    includeExample?: boolean
  ): Promise<Content> {
    const contactDef = await this._genContact(
      openapiTree,
      localize,
      includeExample
    ) as Content[];
    const version = openapiTree.api.info.version;
    const infoVersion = openapiTree.info.title;
    const content: Content = [
      {
        text: localize.apiReference,
        style: ["h2", "primary", "right", "b", "topMargin1"]
      },
      openapiTree.info.title ? {
        text: openapiTree.info.title,
        style: ["title", "right"]
      } : "",
      openapiTree.info.version ? {
        text: `${version}: ${infoVersion}`,
        style: ["p", "b", "right", "alternate"]
      } : "",
      await this._genDescriptionFromMarkdown(openapiTree),
      ...contactDef,
      { text: "", pageBreak: "after" },
    ];
    return new Promise((resolve) => {
      resolve(content);
    });
  }
}

/**
 * PdfPartInfoEmpty is empty info Part only with apiReference
 * text from localize
 */
export class PdfPartInfoEmpty extends PdfPartProcessor {

  async genDef(
    openapiTree: OpenapiInfoV3,
    localize: Localize,
    // eslint-disable-next-line no-unused-vars
    includeExample?: boolean
  ): Promise<Content> {
    const content: Content = [
      {
        text: localize.apiReference,
        style: ["h1", "bold", "primary", "right", "topMargin1"]
      },
      {
        text: "",
        pageBreak: "after"
      },
    ];
    return new Promise((resolve) => {
      resolve(content);
    });
  }
}