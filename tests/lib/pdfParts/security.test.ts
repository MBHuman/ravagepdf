import { PdfPartInfo } from "../../../lib/pdfParts/info";
import { OpenapiInfoV3 } from "../../../lib/structures/openapiInfo";
import { Localize } from "../../../lib/types";


describe("PdfPartInfo", () => {
  let apiPath: string;
  let partInfo: PdfPartInfo;
  let openapiTree: OpenapiInfoV3;
  let localize: Localize;

  beforeEach(() => {
    // eslint-disable-next-line max-len
    apiPath = "https://app.swaggerhub.com/apiproxy/registry/alexei-zaycev/VoiLOC/1.0.0?resolved=true&flatten=true&pretty=true";
    openapiTree = new OpenapiInfoV3();
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

  describe("Basic run tests", () => {
    it("part info should run genDef() without crashing", async () => {
      await openapiTree.parseAndBuild(apiPath);
      partInfo = new PdfPartInfo(openapiTree, localize, true);
      await partInfo.genDef();
    });
  });
});