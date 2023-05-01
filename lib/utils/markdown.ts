import { Content } from "pdfmake/interfaces";
import { marked } from "marked";
import htmlToPdfmake from "html-to-pdfmake";
import { JSDOM } from "jsdom";


/**
   * This method convert markdown string
   * to pdfmake content blocks.
   * 
   * @example
   * ```typescript
   * async function main() {
   *   const markdown = "# Header\n Paragraph text";
   *   const result = await markdownToPdfmake(markdown);
   * }
   * 
   * main();
   * ```
   * 
   * @param markdown 
   */
export async function markdownToPdfmake(markdown?: string): Promise<Content[]> {

  const html = await marked(markdown ?? "");
  const { window } = new JSDOM();
  return new Promise((resolve) => {
    resolve(htmlToPdfmake(html, { window: window }) as Content[]);
  });
}