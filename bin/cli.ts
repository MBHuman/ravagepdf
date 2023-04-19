// import yargs from "yargs";
// import { generatePdf } from "../lib";
// import PdfPrinter, {} from "pdfmake";

import SwaggerParser from "@apidevtools/swagger-parser";
import { OpenAPIV3 } from "openapi-types";

// const argv = yargs(process.argv.slice(2)).options({
//     spec: {type: "string", require: true}
// }).parseSync();

// generatePdf();

SwaggerParser.parse("./files/file.json").then((api) => {
  const paths = api.paths as Record<string, OpenAPIV3.PathItemObject>;
  Object.entries(paths).forEach(([path, item]) => {
    console.log(`${path}\n`);

    Object.keys(item)
      .filter(method => {
        return Object
          .prototype.hasOwnProperty
          .call(item, method);
      })
      .forEach(method => {
        const operationObject = item[
                    method as keyof OpenAPIV3.PathItemObject
        ] as OpenAPIV3.OperationObject;
        console.log(operationObject.requestBody);

        // const requestBody = operationObject.requestBody as
        //     OpenAPIV3.RequestBodyObject;
      });
  });
});

// const generatePdf = new DocGenerator();