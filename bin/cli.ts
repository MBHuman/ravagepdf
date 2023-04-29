import { DocGeneratorPDF, PdfOptions, PdfStyle } from "../lib";

// :TODO #9 Write tests for CLI

const api = "https://app.swaggerhub.com/apiproxy/registry/alexei-zaycev/VoiLOC/1.0.0?resolved=true&flatten=true&pretty=true";
// const api = "./files/file.json";
const pdfStyle = {
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
  mono: { font: "Roboto", fontSize: 10 },
  monoSub: { font: "Roboto", fontSize: 8 },
} as PdfStyle;
const pdfOptions = {
  pdfSortTags: false,
  pdfPrimaryColor: "",
  // pdfAlternateColor: '',
  pdfTitle: "API Reference",
  pdfCoverText: "",
  pdfSecurityText: "",
  pdfApiText: "",
  pdfSchemaStyle: "object",
  pdfFooterText: "",
  includeInfo: true,
  includeToc: true,
  includeSecurity: true,
  includeExample: false,
  includeApiDetails: true,
  includeApiList: false,
  localize: {
    index: "INDEX",
    api: "API",
    apiList: "API List",
    apiReference: "API Reference",
    apiVersion: "API Version",
    contact: "CONTACT",
    name: "NAME",
    email: "EMAIL",
    url: "URL",
    termsOfService: "Terms of service",
    securityAndAuthentication: "Security and Authentication",
    securitySchemes: "SECURITY SCHEMES",
    key: "KEY",
    type: "TYPE",
    example: "EXAMPLE",
    description: "DESCRIPTION",
    request: "REQUEST",
    requestBody: "REQUEST BODY",
    response: "RESPONSES",
    responseModel: "RESPONSE MODEL",
    statusCode: "STATUS CODE",
    deprecated: "DEPRECATED",
    allowed: "ALLOWED",
    default: "DEFAULT",
    readOnly: "READ ONLY",
    writeOnly: "WRITE ONLY",
    enumValues: "ENUM",
    pattern: "PATTERN",
    parameters: "Parameters",
    noRequestParameters: "No request parameters",
    method: "METHOD",
  },
} as PdfOptions;
const docGeneratorPDF = new DocGeneratorPDF(pdfStyle, pdfOptions);

async function main() {
  const pdfDocument = await docGeneratorPDF
    .createPdfAndWriteToFile(api, "./files/file.pdf");
  console.log(pdfDocument);
}

main();