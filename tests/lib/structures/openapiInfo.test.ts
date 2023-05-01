import { OpenapiInfoV3 } from "../../../lib/structures/openapiInfo";

describe("OpenapiInfoV3", () => {
  let openapiInfo: OpenapiInfoV3;

  beforeAll(() => {
    openapiInfo = new OpenapiInfoV3();
  });

  describe("parseAndBuild()", () => {
    it("should parse and build the OpenAPI document", async () => {

      // eslint-disable-next-line max-len
      const apiPath = "https://app.swaggerhub.com/apiproxy/registry/SAIDOVUMID7744_1/aiumid/1.0.0?resolved=true&flatten=true&pretty=true";
      await openapiInfo.parseAndBuild(apiPath);
      expect(openapiInfo).toBeDefined();
      expect(openapiInfo.api).not.toBe({});
      expect(openapiInfo.components).not.toBe({});
      expect(openapiInfo.info).not.toBe({});
      expect(openapiInfo.openapi).not.toBe("");
      expect(openapiInfo.paths).not.toBe({});
      expect(openapiInfo.tagsToPaths).not.toBe({});
    });
  });
});
