// A sample Jasmine test
import { ItemService } from '../app/item/item.service';
import { hello, testing } from '../app/item/test';
// @ts-ignore
const all = require.context('../app', true, /.*/);
all.keys().map(all);
console.log('all:', all.keys())

describe("A suite", function() {
  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });
});

describe("ItemService", function() {
  it("contains spec with an expectation", function() {
    const itemService = new ItemService();
    expect(itemService.getItems().length).toBe(22);
    expect(hello()).toBe('hello')
    expect(testing).toBe(true)
  });
});
