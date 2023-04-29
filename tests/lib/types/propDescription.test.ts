import { PropDescription } from "../../../lib/types/propDescription";


describe("PropDescription type", () => {
  let propDescription: PropDescription;

  beforeAll(() => {
    propDescription = {
      setReadOrWriteOnly: "read",
      setConstraints: "contains",
      setDefault: "default",
      setAllowed: "allowed",
      setPattern: "pattern",
      name: "name"
    };
  });

  describe("Type", () => {
    it("should be defined", () => {
      expect(propDescription).toBeDefined();
    });
  });
});