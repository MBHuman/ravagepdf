import { ContentTable, CustomTableLayout } from "pdfmake/interfaces";

export class RowLinesTableLayout implements CustomTableLayout {
  hLineWidth(i: number, node: ContentTable): number {
    return i === 1 || i === node.table.body.length ? 1 : 0.5;
  }

  vLineWidth(): number {
    return 0;
  }

  hLineColor(i: number, node: ContentTable): string {
    return i === 0 ||
      i === 1 ||
      i === node.table.body.length ? "#777" : "lightgray";
  }
}