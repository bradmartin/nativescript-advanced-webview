import {
  AndroidApplication,
  Application,
  Color,
  Utils
} from '@nativescript/core';

const REQUEST_CODE = 1868;

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
  Application.android.on(
    AndroidApplication.activityResultEvent,
    (args: any) => {
      const requestCode = args.requestCode;
      const resultCode = args.resultCode;
      if (requestCode === REQUEST_CODE) {
        if (resultCode === android.app.Activity.RESULT_CANCELED) {
          if (options.isClosed && typeof options.isClosed === 'function') {
            options.isClosed(true);
          }
          Application.android.off(AndroidApplication.activityResultEvent);
        }
      }
    }
  );

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
        case 6:
          if (options.isClosed && typeof options.isClosed === 'function') {
            options.isClosed(true);
          }
          break;
      }
    }
  });

  const wv = new co.fitcom.fancywebview.AdvancedWebView(activity, i);
  const intentBuilder = wv.getBuilder(); // androidx.browser.customtabs.CustomTabsIntent.Builder

  if (intentBuilder) {
    if (options.toolbarColor) {
      intentBuilder.setToolbarColor(new Color(options.toolbarColor).android);
    }

    if (options.showTitle) {
      intentBuilder.setShowTitle(options.showTitle);
    }

    /// Adds a default share item to the menu.
    /// Enables the url bar to hide as the user scrolls down on the page.
    intentBuilder
      .addDefaultShareMenuItem()
      .enableUrlBarHiding()
      .setInstantAppsEnabled(true);
  }

  wv.setBuilder(intentBuilder);
  wv.loadUrl(options.url);
}

export interface AdvancedWebViewOptions {
  url: string;
  toolbarColor?: string;
  showTitle?: boolean;
  isClosed?: Function;
}
