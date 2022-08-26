import { removeMask } from "./documentUtils";

describe("Document Utils", () => {
  it("should return removed masked input", async () => {
    const text = "56.447.134/0001-00";
    const result = removeMask(text);
    expect(result).toEqual("56447134000100");
  });
});
