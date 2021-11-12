import { Application, Color, Observable, Utils } from '@nativescript/core';
import { AdvancedWebviewEvents, AdvancedWebViewOptions } from './interfaces';

export { AdvancedWebviewEvents } from './interfaces';
export const NSAdvancedWebViewEventEmitter = new Observable();

export function init() {
  (co.fitcom.fancywebview.AdvancedWebView as any).AdvancedWebViewStatics.init(
    Utils.android.getApplicationContext(),
    true
  );
}

export function openAdvancedUrl(options: AdvancedWebViewOptions): void {
  if (!options.url) {
    throw new Error('No url set in the Advanced WebView Options object.');
  }

  const activity =
    Application.android.startActivity || Application.android.foregroundActivity;

  const i = new co.fitcom.fancywebview.AdvancedWebViewListener({
    onCustomTabsServiceConnected(
      componentName: android.content.ComponentName,
      client: any
    ) {},
    onServiceDisconnected(componentName: android.content.ComponentName) {},
    onNavigationEvent: function (
      navigationEvent: number,
      extras: android.os.Bundle
    ) {
      switch (navigationEvent) {
        case 1: // Sent when the tab has started loading a page.
          NSAdvancedWebViewEventEmitter.notify({
            eventName: AdvancedWebviewEvents.LoadStarted
          });
          break;
        case 2: // Sent when the tab has finished loading a page.
          NSAdvancedWebViewEventEmitter.notify({
            eventName: AdvancedWebviewEvents.LoadFinished
          });
          break;
        case 3: // Sent when the tab couldn't finish loading due to a failure.
          NSAdvancedWebViewEventEmitter.notify({
            eventName: AdvancedWebviewEvents.LoadError
          });
          break;
        case 4: // Sent when loading was aborted by a user action before it finishes like clicking on a link or refreshing the page.
          break;
        case 5: // Sent when the tab becomes visible.
          break;
        case 6: // Sent when the tab becomes hidden.
          NSAdvancedWebViewEventEmitter.notify({
            eventName: AdvancedWebviewEvents.Closed
          });
          break;
      }
    }
  });

  const wv = new co.fitcom.fancywebview.AdvancedWebView(activity, i);
  const intentBuilder = wv.getBuilder(); // androidx.browser.customtabs.CustomTabsIntent.Builder

  if (options.toolbarColor) {
    const defaultColors = new (
      androidx as any
    ).browser.customtabs.CustomTabColorSchemeParams.Builder()
      .setToolbarColor(new Color(options.toolbarColor).android)
      .build();

    const darkParams = new (
      androidx as any
    ).browser.customtabs.CustomTabColorSchemeParams.Builder()
      .setToolbarColor(new Color('#222').android)
      .build();

    intentBuilder
      .setColorScheme(
        (androidx as any).browser.customtabs.CustomTabsIntent
          .COLOR_SCHEME_SYSTEM
      )
      .setColorSchemeParams(
        (androidx as any).browser.customtabs.CustomTabsIntent.COLOR_SCHEME_DARK,
        darkParams
      )
      .setDefaultColorSchemeParams(defaultColors);
  }

  /// Adds a default share item to the menu.
  /// Enables the url bar to hide as the user scrolls down on the page.
  intentBuilder
    .setShowTitle(options.showTitle ? options.showTitle : true)
    .setDefaultShareMenuItemEnabled(true)
    .setInstantAppsEnabled(true)
    .setUrlBarHidingEnabled(true);

  wv.setBuilder(intentBuilder);
  wv.loadUrl(options.url);
}

export function close() {
  // not implemented yet - need to research approaches
}
