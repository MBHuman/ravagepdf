import { PdfOptions } from ".../../../lib/types/pdfOptions";

describe("PdfOptions type", () => {
  let pdfOptions: PdfOptions;

  beforeAll(() => {
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
      includeExample: true,
      includeApiDetails: true,
      includeApiList: true,
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
      }
    };
  });

  describe("Type", () => {
    it("should be defined", () => {
      expect(pdfOptions).toBeDefined();
    });
  });
});
