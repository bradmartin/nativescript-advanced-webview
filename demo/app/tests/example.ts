// @ts-ignore
const all = require.context('../', true, /main-.*\.ts$/);
all.keys().map(all);

describe("A suite", function() {
  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });
});
