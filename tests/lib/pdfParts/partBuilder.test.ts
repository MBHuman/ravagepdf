import { PdfPartToc } from "../../../lib/pdfParts";
import { PdfPartInfo } from "../../../lib/pdfParts/info";
import { PdfPartBuilder } from "../../../lib/pdfParts/partBuilder";
import { PdfPartProcessor } from "../../../lib/pdfParts/partProcessor";
import { Localize } from "../../../lib/types/localize";
import { PdfStyle } from "../../../lib/types/pdfStyle";

describe("PdfPartBuilder", () => {
  let pdfPartBuilder: PdfPartBuilder;
  let mockPart1: PdfPartProcessor;
  let mockPart2: PdfPartProcessor;
  let localize: Localize;
  let pdfStyle: PdfStyle;
  let apiPath: string;

  beforeEach(() => {
    localize = {
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
    };
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
      mono: { font: "Courier", fontSize: 10 },
      monoSub: { font: "Courier", fontSize: 8 },
    };
    mockPart1 = new PdfPartToc();
    mockPart2 = new PdfPartInfo();
    pdfPartBuilder = new PdfPartBuilder(
      localize,
      pdfStyle,
      true /* includeExamples */,
    );
    // eslint-disable-next-line max-len
    apiPath = "https://app.swaggerhub.com/apiproxy/registry/SAIDOVUMID7744_1/aiumid/1.0.0?resolved=true&flatten=true&pretty=true";
  });

  describe("buildParts", () => {
    it("should build all pdf parts and return an array of contents",
      async () => {
        pdfPartBuilder.addParts([mockPart1, mockPart2]);

        // Call the method being tested
        const contents = await pdfPartBuilder.buildParts(apiPath);

        expect(contents).not.toEqual([]);
      });
  });

  describe("addPart", () => {
    it("should add a pdf part to the builder", async () => {
      // Create a mock PdfPartProcessor object
      const mockPart = new PdfPartToc();

      // Call the method being tested
      await pdfPartBuilder.addPart(mockPart);

      // Check the result
      expect(pdfPartBuilder["_pdfParts"]).toContain(mockPart);
    });
  });

  describe("addParts", () => {
    it("should add an array of pdf parts to the builder", async () => {
      // Create mock PdfPartProcessor objects
      const partsToAdd = [mockPart1, mockPart2];

      // Call the method being tested
      await pdfPartBuilder.addParts(partsToAdd);

      // Check the result
      expect(pdfPartBuilder["_pdfParts"]).toContain(mockPart1);
      expect(pdfPartBuilder["_pdfParts"]).toContain(mockPart2);
    });
  });

  describe("cleanParts", () => {
    it("should remove all pdf parts from the builder", async () => {
      // Call the method being tested
      await pdfPartBuilder.cleanParts();

      // Check the result
      expect(pdfPartBuilder["_pdfParts"]).toEqual([]);
    });
  });
});
