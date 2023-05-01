import { Localize } from ".../../../lib/types/localize";

describe("Localize type", () => {
  let localize: Localize;

  beforeAll(() => {
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
  });

  describe("Type", () => {
    it("should be defined", () => {
      expect(localize).toBeDefined();
    });
  });
});
