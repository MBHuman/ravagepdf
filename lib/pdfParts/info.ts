import { Content, ContentStack } from "pdfmake/interfaces";
import { PdfPartProcessor } from "./partProcessor";

export class PdfPartInfo extends PdfPartProcessor {

  private async _genName(): Promise<Content> {
    let contactName = {} as Content;
    if (this._openapiTree.info.contact?.name) {
      contactName = {
        text: [
          { text: `\n${this._localize.name}: `, style: ["b", "small"] },
          { text: this._openapiTree.info.contact?.name, style: ["small"] },
        ],
      } as Content;
    }
    return new Promise((resolve) => {
      resolve(contactName);
    });
  }

  private async _genEmail(): Promise<Content> {
    let contactEmail = {} as Content;
    if (this._openapiTree.info.contact?.email) {
      contactEmail = {
        text: [
          { text: `\n${this._localize.email}: `, style: ["b", "small"] },
          { text: this._openapiTree.info.contact?.email, style: ["small"] },
        ],
      } as Content;
    }
    return new Promise((resolve) => {
      resolve(contactEmail);
    });
  }

  private async _genUrl(): Promise<Content> {
    let contactUrl = {} as Content;

    if (this._openapiTree.info.contact?.url) {
      contactUrl = {
        text: [
          {
            text: `\n${this._localize.url}: `,
            style: ["b", "small"]
          },
          {
            text: this._openapiTree.info.contact?.url,
            style: ["small", "blue"],
            link: this._openapiTree.info.contact?.url
          },
        ],
      } as Content;
    }
    return new Promise((resolve) => {
      resolve(contactUrl);
    });
  }

  private async _genTermsOfService(): Promise<Content> {
    let termsOfService = {} as Content;
    if (this._openapiTree.info.termsOfService) {
      termsOfService = {
        text: [
          {
            text: `\n${this._localize.termsOfService}: `,
            style: ["b", "small"]
          },
          {
            text: this._openapiTree.info.termsOfService,
            style: ["small", "blue"],
            link: this._openapiTree.info.termsOfService
          },
        ],
      } as Content;
    }
    return new Promise((resolve) => {
      resolve(termsOfService);
    });
  }

  private async _genContact(): Promise<Content[]> {
    const contactDef: Content[] = [
      await this._genName(),
      await this._genEmail(),
      await this._genUrl(),
      await this._genTermsOfService(),
    ];
    return new Promise((resolve) => {
      resolve(contactDef);
    });
  }

  private async _genDescriptionFromMarkdown(): Promise<ContentStack> {
    let content = {} as ContentStack;
    if (this._openapiTree.info.description) {
      content = {
        stack: await this.markdownToPdfmake(this._openapiTree.info.description),
        style: ["topMargin3"],
      };
    }
    return new Promise((resolve) => {
      resolve(content);
    });
  }

  async genDef(): Promise<Content[]> {
    const contactDef = await this._genContact();
    const version = this._openapiTree.api.info.version;
    const infoVersion = this._openapiTree.info.title;
    const content: Content[] = [
      {
        text: this._localize.apiReference,
        style: ["h2", "primary", "right", "b", "topMargin1"]
      },
      this._openapiTree.info.title ? {
        text: this._openapiTree.info.title,
        style: ["title", "right"]
      } : "",
      this._openapiTree.info.version ? {
        text: `${version}: ${infoVersion}`,
        style: ["p", "b", "right", "alternate"]
      } : "",
      await this._genDescriptionFromMarkdown(),
      ...contactDef,
      { text: "", pageBreak: "after" },
    ];
    return new Promise((resolve) => {
      resolve(content);
    });
  }
}

export class PdfPartInfoEmpty extends PdfPartProcessor {

  async genDef(): Promise<Content[]> {
    const content: Content[] = [
      {
        text: this._localize.apiReference,
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