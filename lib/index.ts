/**
 * Doc generator generates documentation from openapi file, it can be link to
 * web uri or file path or URL of an OpenAPI definition
 */
export class DocGenerator {

    private _pdfStyle: PdfStyle;
    private _doc: string;

    constructor(pdfStyles: PdfStyle) {
        this._pdfStyle = pdfStyles;
        this._doc = "";
        console.log(pdfStyles);
    }

    set pdfStyles(style: PdfStyle) {
        this._pdfStyle = style;
    }

    /**
   *
   * @param api An OpenAPI definition, or the file path or URL of an OpenAPI
   * definition. The path can be absolute or relative. In Node, the path is
   * relative to process.cwd(). In the browser, it's relative to the URL of
   * the page.
   */
    createPdf(api: string): Promise<Buffer> {
        return new Promise((resolve) => {
            console.log(api);
            resolve(Buffer.concat([]));
        });
    }
}

export type PdfStyle = {
  title: { fontSize: number };
  h1: { fontSize: number };
  h2: { fontSize: number };
  h3: { fontSize: number };
  h4: { fontSize: number };
  h5: { fontSize: number };
  h6: { fontSize: number; bold: boolean };
  p: { fontSize: number };
  small: { fontSize: number };
  sub: { fontSize: number };
  right: { alignment: string };
  left: { alignment: string };
  topMargin1: { margin: [number, number, number, number] };
  topMargin2: { margin: [number, number, number, number] };
  topMargin3: { margin: [number, number, number, number] };
  topMargin4: { margin: [number, number, number, number] };
  topMarginRegular: { margin: [number, number, number, number] };
  tableMargin: { margin: [number, number, number, number] };
  b: { bold: boolean };
  i: { italics: boolean };
  primary: { color: string };
  alternate: { color: string };
  gray: { color: string };
  lightGray: { color: string };
  darkGray: { color: string };
  red: { color: string };
  blue: { color: string };
  mono: { font: string; fontSize: number };
  monoSub: { font: string; fontSize: number };
};
