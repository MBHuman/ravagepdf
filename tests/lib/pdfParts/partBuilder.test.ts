import { PdfPartToc } from "../../../lib/pdfParts";
import { PdfPartInfo } from "../../../lib/pdfParts/info";
import { PdfPartBuilder } from "../../../lib/pdfParts/partBuilder";
import { PdfPartProcessor } from "../../../lib/pdfParts/partProcessor";

describe("PdfPartBuilder", () => {
  let pdfPartBuilder: PdfPartBuilder;
  let mockPart1: PdfPartProcessor;
  let mockPart2: PdfPartProcessor;
  let apiPath: string;

  beforeEach(() => {
    mockPart1 = new PdfPartToc();
    mockPart2 = new PdfPartInfo();
    pdfPartBuilder = new PdfPartBuilder();
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
