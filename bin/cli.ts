// import yargs from "yargs";
// import { generatePdf } from "../lib";
import PdfPrinter, {} from "pdfmake";

// const argv = yargs(process.argv.slice(2)).options({
//     spec: {type: "string", require: true}
// }).parseSync();

// generatePdf();

const doc = new PdfPrinter({
    
}).createPdfKitDocument(finalDocRef);