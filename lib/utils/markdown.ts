import { Content } from "pdfmake/interfaces";
import { marked } from "marked";
import htmlToPdfmake from "html-to-pdfmake";
import { JSDOM } from "jsdom";
import { promises as fsPromises } from "fs";
import { join, dirname } from "path";
import axios from "axios";


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

  // Extract image sources from HTML
  const imageSources = await extractImageSources(html);

  // Load images and convert them to base64
  const imageBase64Promises = imageSources.map(async (src) => {
    const imageFilePath = await downloadImage(src);
    const imageData = await fsPromises.readFile(imageFilePath);
    const base64 = imageData.toString("base64");
    return `data:image/png;base64,${base64}" style="max-width: 600px;`;
  });

  const images = await Promise.all(imageBase64Promises);

  // Replace image sources in the HTML with base64 images
  let modifiedHtml = html;
  for (let i = 0; i < imageSources.length; i++) {
    modifiedHtml = modifiedHtml.replace(
      imageSources[i],
      images[i]
    );
  }

  return new Promise((resolve) => {
    resolve(htmlToPdfmake(modifiedHtml, { window: window }) as Content[]);
  });
}

/**
 * This method extracts image sources from HTML.
 * 
 * @param html 
 * @returns Array of image sources
 */
export async function extractImageSources(html: string): Promise<string[]> {
  const imgRegex = /<img.*?src=["'](.*?)["']/g;
  const matches = html.match(imgRegex);
  if (matches) {
    return matches.map((match) => {
      const srcRegex = /src=["'](.*?)["']/;
      const srcMatch = match.match(srcRegex);
      if (srcMatch && srcMatch[1]) {
        return srcMatch[1];
      }
      return "";
    });
  }
  return [];
}

/**
 * This method downloads the image from the given URL and 
 * returns the local file path.
 * 
 * @param imageUrl 
 * @returns Local file path
 */
export async function downloadImage(imageUrl: string): Promise<string> {
  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const fileName = await getImageFileName(imageUrl);
    const imageFilePath = join(dirname(__filename), fileName);
    await fsPromises.writeFile(imageFilePath, response.data);
    return imageFilePath;
  } catch (error) {
    console.error("Failed to download image:", error);
    throw error;
  }
}

/**
 * This method extracts the file name from the given image URL.
 * 
 * @param imageUrl 
 * @returns File name
 */
export async function getImageFileName(imageUrl: string): Promise<string> {
  const matches = imageUrl.match(/\/([^/?#]+)[^/]*$/);
  if (matches && matches[1]) {
    return matches[1];
  }
  return "image.png";
}