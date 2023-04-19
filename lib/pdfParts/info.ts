import { Content } from "pdfmake/interfaces";
import { PdfPartProcessor } from "./partProcessor";

export class PdfPartInfo extends PdfPartProcessor {

  private async _genName(): Promise<Content> {
    const contactName: Content = {
      text: [
        { text: `\n${this._localize.name}: `, style: ["b", "small"] },
        { text: spec.info.contact.name, style: ["small"] },
      ],
    };
    return new Promise((resolve) => {
      resolve(contactName);
    });
  }

  private async _genEmail(): Promise<Content> {
    const contactEmail: Content = {
      text: [
        { text: `\n${this._localize.email}: `, style: ["b", "small"] },
        { text: spec.info.contact.email, style: ["small"] },
      ],
    };
    return new Promise((resolve) => {
      resolve(contactEmail);
    });
  }

  private async _genUrl(): Promise<Content> {
    const contactUrl: Content = {
      text: [
        {
          text: `\n${this._localize.url}: `,
          style: ["b", "small"]
        },
        {
          text: spec.info.contact.url,
          style: ["small", "blue"],
          link: spec.info.contact.url
        },
      ],
    };
    return new Promise((resolve) => {
      resolve(contactUrl);
    });
  }

  private async _genTermsOfService(): Promise<Content> {
    const termsOfService: Content = {
      text: [
        {
          text: `\n${this._localize.termsOfService}: `,
          style: ["b", "small"]
        },
        {
          text: spec.info.termsOfService,
          style: ["small", "blue"],
          link: spec.info.termsOfService
        },
      ],
    };
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

  async genDef(): Promise<Content[]> {
    const contactDef = await this._genContact();
    const version = this._localize.apiVersion;
    const infoVersion = this._localize.info.version;
    const content: Content[] = [
      {
        text: bookTitle || this._localize.apiReference,
        style: ["h2", "primary", "right", "b", "topMargin1"]
      },
      spec.info.title ? {
        text: spec.info.title,
        style: ["title", "right"]
      } : "",
      spec.info.version ? {
        text: `${version}: ${infoVersion}`,
        style: ["p", "b", "right", "alternate"]
      } : "",
      specInfDescrMarkDef,
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
        text: bookTitle || this._localize.apiReference,
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