import { markdownToPdfmake } from "../../../lib/utils/markdown";


describe("markdownToPdfMake", () => {

  describe("test functionality to convert", () => {
    it("should convert markdown to pdfmake", async () => {
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
      const result = await markdownToPdfmake(markdown);
      expect(result).toEqual(expected);
    });
  });
});