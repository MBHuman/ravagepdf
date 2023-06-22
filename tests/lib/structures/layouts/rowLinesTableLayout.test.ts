
import {
  RowLinesTableLayout
} from "../../../../lib/structures/layouts";

describe("RowLinesTableLayout", () => {
  describe("hLineWidth", () => {
    it("returns 1 when i is 1", () => {
      const rowLinesTableLayout = new RowLinesTableLayout();
      const node = { table: { body: [["a", "b"], ["c", "d"]] } };
      expect(rowLinesTableLayout.hLineWidth(1, node)).toEqual(1);
    });

    it("returns 0.5 when i is not 1 or the length of body", () => {
      const rowLinesTableLayout = new RowLinesTableLayout();
      const node = { table: { body: [["a", "b"], ["c", "d"]] } };
      expect(rowLinesTableLayout.hLineWidth(3, node)).toEqual(0.5);
    });
  });

  describe("vLineWidth", () => {
    it("returns 0", () => {
      const rowLinesTableLayout = new RowLinesTableLayout();
      expect(rowLinesTableLayout.vLineWidth()).toEqual(0);
    });
  });

  describe("hLineColor", () => {
    it("returns '#777' when i is 0, 1, or the last index", () => {
      const rowLinesTableLayout = new RowLinesTableLayout();
      const node = { table: { body: [["a", "b"], ["c", "d"]] } };
      expect(rowLinesTableLayout.hLineColor(0, node)).toEqual("#777");
      expect(rowLinesTableLayout.hLineColor(1, node)).toEqual("#777");
      expect(rowLinesTableLayout.hLineColor(4, node)).toEqual("lightgray");
    });

    it("returns 'lightgray' when i is not 0, 1, or the last index", () => {
      const rowLinesTableLayout = new RowLinesTableLayout();
      const node = { table: { body: [["a", "b"], ["c", "d"]] } };
      expect(rowLinesTableLayout.hLineColor(3, node)).toEqual("lightgray");
    });
  });
});
