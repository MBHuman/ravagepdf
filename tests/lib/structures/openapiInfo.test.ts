import { OpenapiInfoV3 } from "../../../lib/structures/openapiInfo";

describe("OpenapiInfoV3", () => {
  let openapiInfo: OpenapiInfoV3;

  beforeAll(() => {
    openapiInfo = new OpenapiInfoV3();
  });

  describe("parseAndBuild()", () => {
    it("should parse and build the OpenAPI document", async () => {
       
      const apiPath = "https://pak_tst005.smartpack.world/openapi.json";
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
