import { PdfPartProcessor } from "../../../lib/pdfParts/partProcessor";
import { Localize } from "../../../lib/types/localize";
import { OpenapiInfoV3 } from "../../../lib/structures/openapiInfo";

describe("PdfPartProcessor", () => {
  let processor: PdfPartProcessor;

  beforeEach(() => {
    const openapiTree = new OpenapiInfoV3();
    processor = new PdfPartProcessor(
      openapiTree,
      {} as Localize
    );
  });

  describe("markdownToPdfmake", () => {
    it("should convert markdown to pdfmake content", async () => {
      const markdown = "# Header\n Paragraph text";
      const expected = [
        {
          bold: true,
          fontSize: 24,
          id: "header",
          marginBottom: 5,
          nodeName: "H1",
          style: ["html-h1"],
          text: "Header",
        },
        {
          text: " ",
        },
        {
          margin: [0, 5, 0, 10],
          nodeName: "P",
          style: ["html-p"],
          text: " Paragraph text",
        },
        {
          text: " ",
        },
      ];
      const result = await processor.markdownToPdfmake(markdown);
      expect(result).toEqual(expected);
    });
  });

  describe("genDef", () => {
    it("should return pdfmake content", async () => {
      // write your test case here
    });
  });
});