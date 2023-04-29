import { OpenAPIV3 } from "openapi-types";
import { Content } from "pdfmake/interfaces";

export async function MediaToTree(
  obj: OpenAPIV3.MediaTypeObject
): Promise<Content> {
  if (!obj.schema) {
    return {} as Content;
  }
  const rows = [
    [
      { text: "", margin: 0 },
      { text: "", margin: 0 },
      { text: "", margin: 0 },
    ],
  ];
  return {} as Content;
}