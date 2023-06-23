#!/usr/bin/env node
import yargs from "yargs";
import { DocGeneratorPDF } from "../lib";

// :TODO #9 Write tests for CLI
const argv = yargs(process.argv.slice(2)).options({
  spec: {
    type: "string",
    require: true,
    description: "JSON, YML file or URL with openapi scpecification",
    alias: "s",
  },
  out: {
    type: "string",
    require: true,
    alias: "o",
    description: "output file with pdf",
  }
}).parseSync();

const docGeneratorPDF = new DocGeneratorPDF();

async function main() {
  await docGeneratorPDF
    .createPdfAndWriteToFile(argv.spec, argv.out);
}

main();