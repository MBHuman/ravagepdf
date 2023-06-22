import { PDFDoc } from "../../../lib/structures/pdfDoc";
import fs from "fs";

describe("PdfDoc test", () => {

  describe("DocGeneratorPDF", () => {

    let pdfDoc: PDFDoc;
    let api: string;

    beforeAll(() => {
      // eslint-disable-next-line max-len
      api = "https://app.swaggerhub.com/apiproxy/registry/SAIDOVUMID7744_1/aiumid/1.0.0?resolved=true&flatten=true&pretty=true";
      pdfDoc = new PDFDoc();
    });

    it("Should build pdf", async () => {
      const pdfDocument = await pdfDoc.build(api);
      expect(pdfDocument).toBeInstanceOf(PDFDoc);
    });

    it("And write it to file", async () => {
      const fileName = "filePdfDoc.pdf";
      await pdfDoc.build(api).then((doc) => {
        doc.writeToFile(fileName);
      });
      await new Promise(resolve => setTimeout(resolve, 500));
      const isExists = fs.existsSync(fileName);
      expect(isExists).toBe(true);
      fs.unlinkSync(fileName);
      await new Promise(resolve => setTimeout(resolve, 500));
      expect(fs.existsSync(fileName)).toBe(false);
    });
  });
});