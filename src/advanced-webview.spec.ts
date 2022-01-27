import { init, openAdvancedUrl } from '.';

// Unit tests for the plugin
describe('nativescript-advanced-webview', function () {
  it('sanity check', function () {
    expect(init).toBeDefined();
    expect(() => init()).not.toThrow();
    expect(() =>
      openAdvancedUrl({
        url: ''
      })
    ).toThrowError();
  });
});