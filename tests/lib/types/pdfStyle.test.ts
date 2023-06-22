import { PdfStyle } from ".../../../lib/types/pdfStyle";

describe("PdfStyle type", () => {
  let pdfStyle: PdfStyle;

  beforeAll(() => {
    pdfStyle = {
      title: { fontSize: 32 },
      h1: { fontSize: 22 },
      h2: { fontSize: 20 },
      h3: { fontSize: 18 },
      h4: { fontSize: 16 },
      h5: { fontSize: 14 },
      h6: { fontSize: 12, bold: true },
      p: { fontSize: 12 },
      small: { fontSize: 10 },
      sub: { fontSize: 8 },
      right: { alignment: "right" },
      left: { alignment: "left" },
      topMargin1: { margin: [0, 180, 0, 10] },
      topMargin2: { margin: [0, 60, 0, 5] },
      topMargin3: { margin: [0, 20, 0, 3] },
      topMargin4: { margin: [0, 15, 0, 3] },
      topMarginRegular: { margin: [0, 3, 0, 0] },
      tableMargin: { margin: [0, 5, 0, 15] },
      b: { bold: true },
      i: { italics: true },
      primary: {
        color: "#b44646",
      },
      alternate: {
        color: "#005b96",
      },
      gray: { color: "gray" },
      lightGray: { color: "#aaaaaa" },
      darkGray: { color: "#666666" },
      red: { color: "orangered" },
      blue: { color: "#005b96" },
      mono: { font: "Courier", fontSize: 10 },
      monoSub: { font: "Courier", fontSize: 8 },
    };
  });

  describe("Type", () => {
    it("should be defined", () => {
      expect(pdfStyle).toBeDefined();
    });
  });
});
