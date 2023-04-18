import { DocGenerator, PdfStyle } from "./index";

describe("DocGenerator", () => {
    let docGenerator: DocGenerator;
    const pdfStyles: PdfStyle = {
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
        topMargin1: { margin: [0, 0,0, 0] },
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

    beforeEach(() => {
        docGenerator = new DocGenerator(pdfStyles);
    });

    describe("createPdf", () => {
        it("should return a Promise", () => {
            const api = "https://example.com/api.yaml";
            const result = docGenerator.createPdf(api);
            expect(result).toBeInstanceOf(Promise);
        });

        it("should resolve to a Buffer", async () => {
            const api = "https://example.com/api.yaml";
            const result = await docGenerator.createPdf(api);
            expect(result).toBeInstanceOf(Buffer);
        });

        it("should log the api argument", () => {
            const api = "https://example.com/api.yaml";
            const spy = jest.spyOn(console, "log");
            docGenerator.createPdf(api);
            expect(spy).toHaveBeenCalledWith(api);
            spy.mockRestore();
        });
    });
});
