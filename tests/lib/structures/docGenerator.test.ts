import { PdfOptions, PdfStyle } from "../../../lib/types";
import { PDFDoc } from "../../../lib/structures/pdfDoc";
import { DocGeneratorPDF } from "../../../lib/structures/docGenerator";
import fs from "fs";

describe("DocGeneratorPDF", () => {
  let pdfStyle: PdfStyle;
  let pdfOptions: PdfOptions;
  let docGeneratorPDF: DocGeneratorPDF;
  let api: string;

  beforeEach(() => {
    // eslint-disable-next-line max-len
    api = "https://app.swaggerhub.com/apiproxy/registry/alexei-zaycev/VoiLOC/1.0.0?resolved=true&flatten=true&pretty=true";
    pdfStyle = {
      title: { fontSize: 32 },
      h1: { fontSize: 22 },
      h2: { fontSize: 20 },
      h3: { fontSize: 18 },
      h4: { fontSize: 16 },
      h5: { fontSize: 14 },
      h6: { fontSize: 12, bold: true },
      p: { fontSize: 12 },
      small: { fontSize: 10 },
      sub: { fontSize: 8 },
      right: { alignment: "right" },
      left: { alignment: "left" },
      topMargin1: { margin: [0, 180, 0, 10] },
      topMargin2: { margin: [0, 60, 0, 5] },
      topMargin3: { margin: [0, 20, 0, 3] },
      topMargin4: { margin: [0, 15, 0, 3] },
      topMarginRegular: { margin: [0, 3, 0, 0] },
      tableMargin: { margin: [0, 5, 0, 15] },
      b: { bold: true },
      i: { italics: true },
      primary: {
        color: "#b44646",
      },
      alternate: {
        color: "#005b96",
      },
      gray: { color: "gray" },
      lightGray: { color: "#aaaaaa" },
      darkGray: { color: "#666666" },
      red: { color: "orangered" },
      blue: { color: "#005b96" },
      mono: { font: "Roboto", fontSize: 10 },
      monoSub: { font: "Roboto", fontSize: 8 },
    };
    pdfOptions = {
      pdfSortTags: false,
      pdfPrimaryColor: "",
      // pdfAlternateColor: '',
      pdfTitle: "API Reference",
      pdfCoverText: "",
      pdfSecurityText: "",
      pdfApiText: "",
      pdfSchemaStyle: "object",
      pdfFooterText: "",
      includeInfo: true,
      includeToc: true,
      includeSecurity: true,
      includeExample: false,
      includeApiDetails: true,
      includeApiList: false,
      localize: {
        index: "INDEX",
        api: "API",
        apiList: "API List",
        apiReference: "API Reference",
        apiVersion: "API Version",
        contact: "CONTACT",
        name: "NAME",
        email: "EMAIL",
        url: "URL",
        termsOfService: "Terms of service",
        securityAndAuthentication: "Security and Authentication",
        securitySchemes: "SECURITY SCHEMES",
        key: "KEY",
        type: "TYPE",
        example: "EXAMPLE",
        description: "DESCRIPTION",
        request: "REQUEST",
        requestBody: "REQUEST BODY",
        response: "RESPONSE",
        responseModel: "RESPONSE MODEL",
        statusCode: "STATUS CODE",
        deprecated: "DEPRECATED",
        allowed: "ALLOWED",
        default: "DEFAULT",
        readOnly: "READ ONLY",
        writeOnly: "WRITE ONLY",
        enumValues: "ENUM",
        pattern: "PATTERN",
        parameters: "Parameters",
        noRequestParameters: "No request parameters",
        method: "METHOD",
      },
    };
    docGeneratorPDF = new DocGeneratorPDF(pdfStyle, pdfOptions);
  });

  describe("createPdf", () => {
    it("should build a PDF document from an OpenAPI definition", async () => {
      const pdfDocument = await docGeneratorPDF.createPdf(api);
      expect(pdfDocument).toBeInstanceOf(PDFDoc);
    });
  });

  describe("writeToFile", () => {
    it("should write a PDF document to a file", async () => {
      const pdfDocument = await docGeneratorPDF.createPdf(api);
      const fileName = "test1.pdf";
      await pdfDocument.writeToFile(fileName);
      // check that the file exists
      await new Promise(resolve => setTimeout(resolve, 1000));
      const isExists = fs.existsSync(fileName);
      expect(isExists).toBe(true);
      fs.unlinkSync(fileName);
      await new Promise(resolve => setTimeout(resolve, 1000));
      expect(fs.existsSync(fileName)).toBe(false);
    });
  });

  describe("createPdfAndWriteToFile", () => {
    it("should create a PDF document and write it to a file", async () => {
      const fileName = "test2.pdf";
      await docGeneratorPDF.createPdfAndWriteToFile(api, fileName);
      // check that the file exists
      await new Promise(resolve => setTimeout(resolve, 1000));
      const isExists = fs.existsSync(fileName);
      expect(isExists).toBe(true);
      fs.unlinkSync(fileName);
      await new Promise(resolve => setTimeout(resolve, 1000));
      expect(fs.existsSync(fileName)).toBe(false);
    });
  });
});
