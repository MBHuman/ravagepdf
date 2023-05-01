import { execSync } from "child_process";
import fs from "fs";

describe("doc-generator-pdf CLI", () => {

  const specJSON = "./tests/test-openapi.json";
  const specYML = "./tests/test-openapi.yml";
  const pdfPath = "./test-pdf.pdf";

  beforeEach(() => {
    // Remove output file before each test
    if (fs.existsSync(pdfPath)) {
      fs.unlinkSync(pdfPath);
    }
  });

  afterEach(() => {
    // Remove output file after each test
    if (fs.existsSync(pdfPath)) {
      fs.unlinkSync(pdfPath);
    }
  });

  beforeAll(() => {
    const cmd = "npm run build";
    execSync(cmd);
  });

  it("should generate a PDF document from a local JSON file", () => {
    const cmd = `./dist/bin/cli.js --spec ${specJSON} --out ${pdfPath}`;
    execSync(cmd);

    // Verify that the output file was created
    expect(fs.existsSync(pdfPath)).toBe(true);
  });

  it("should generate a PDF document from a local JSON file", () => {
    const cmd = `./dist/bin/cli.js --spec ${specYML} --out ${pdfPath}`;
    execSync(cmd);

    // Verify that the output file was created
    expect(fs.existsSync(pdfPath)).toBe(true);
  });

  it("should generate a PDF document from a remote URL", () => {
    // eslint-disable-next-line max-len
    const url = "https://app.swaggerhub.com/apiproxy/registry/SAIDOVUMID7744_1/aiumid/1.0.0?resolved=true&flatten=true&pretty=true";
    const cmd = `./dist/bin/cli.js --out ${pdfPath} --spec ${url}`;
    execSync(cmd);

    // Verify that the output file was created
    expect(fs.existsSync(pdfPath)).toBe(true);
  });

  it("should display an error message if the --spec argument is missing",
    () => {
      const cmd = `./dist/bin/cli.js --out ${pdfPath}`;
      expect(() => {
        execSync(cmd);
      }).toThrowError();
    });

  it("should display an error message if the --out argument is missing",
    () => {
      const cmd = `./dist/bin/cli.js --spec ${specJSON}`;
      expect(() => {
        execSync(cmd);
      }).toThrowError();
    });

  it(`should display an error message if the --spec argument 
      points to an invalid file or URL`, () => {
    const cmd = `./dist/bin/cli.js --out ${pdfPath} --spec invalid `;
    expect(() => {
      execSync(cmd);
    }).toThrowError();
  });
});
