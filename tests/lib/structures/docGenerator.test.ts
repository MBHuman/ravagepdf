import { PDFDoc } from "../../../lib/structures/pdfDoc";
import { DocGeneratorPDF } from "../../../lib/structures/docGenerator";
import fs from "fs";

describe("DocGeneratorPDF", () => {
  let docGeneratorPDF: DocGeneratorPDF;
  let api: string;

  beforeEach(() => {
    // eslint-disable-next-line max-len
    api = "https://app.swaggerhub.com/apiproxy/registry/SAIDOVUMID7744_1/aiumid/1.0.0?resolved=true&flatten=true&pretty=true";
    docGeneratorPDF = new DocGeneratorPDF();
  });

  describe("createPdf", () => {
    it("should build a PDF document from an OpenAPI definition", async () => {
      const pdfDocument = await docGeneratorPDF.createPdf(api);
      expect(pdfDocument).toBeInstanceOf(PDFDoc);
    });
  });

  describe("writeToFile", () => {
    it("should write a PDF document to a file", async () => {
      const pdfDocument = await docGeneratorPDF.createPdf(api);
      const fileName = "test1.pdf";
      await pdfDocument.writeToFile(fileName);
      // check that the file exists
      await new Promise(resolve => setTimeout(resolve, 500));
      const isExists = fs.existsSync(fileName);
      expect(isExists).toBe(true);
      fs.unlinkSync(fileName);
      await new Promise(resolve => setTimeout(resolve, 500));
      expect(fs.existsSync(fileName)).toBe(false);
    });
  });

  describe("createPdfAndWriteToFile", () => {
    it("should create a PDF document and write it to a file", async () => {
      const fileName = "test2.pdf";
      await docGeneratorPDF.createPdfAndWriteToFile(api, fileName);
      // check that the file exists
      await new Promise(resolve => setTimeout(resolve, 1000));
      const isExists = fs.existsSync(fileName);
      expect(isExists).toBe(true);
      fs.unlinkSync(fileName);
      await new Promise(resolve => setTimeout(resolve, 1000));
      expect(fs.existsSync(fileName)).toBe(false);
    });
  });
});
