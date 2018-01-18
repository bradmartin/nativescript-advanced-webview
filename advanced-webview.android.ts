/**********************************************************************************
 * (c) 2016, Brad Martin.
 * Licensed under the MIT license.
 *
 * Version 1.0.0                                           bradwaynemartin@gmail.com
 **********************************************************************************/
("use strict");

import { Color } from "tns-core-modules/color";
import * as app from "tns-core-modules/application";
import * as utils from "tns-core-modules/utils/utils";

export function init() {
  co.fitcom.fancywebview.AdvancedWebView.init(
    utils.ad.getApplicationContext(),
    true
  );
}

export function openAdvancedUrl(options: AdvancedWebViewOptions): void {
  if (!options.url) {
    throw new Error("No url set in the Advanced WebView Options object.");
  }

  let activity = app.android.startActivity || app.android.foregroundActivity;
  let client;
  const i = new co.fitcom.fancywebview.AdvancedWebViewListener({
    onCustomTabsServiceConnected(
      componentName: android.content.ComponentName,
      client: any
    ) {},
    onServiceDisconnected(componentName: android.content.ComponentName) {},
    onNavigationEvent: function(
      navigationEvent: number,
      extras: android.os.Bundle
    ) {
      switch (navigationEvent) {
        case 6:
          if (options.isClosed && typeof options.isClosed === "function") {
            options.isClosed(true);
          }
          break;
      }
    }
  });
  const wv = new co.fitcom.fancywebview.AdvancedWebView(
    utils.ad.getApplicationContext(),
    i
  );
  let intentBuilder = wv.getBuilder();

  if (options.toolbarColor) {
    intentBuilder.setToolbarColor(new Color(options.toolbarColor).android);
  }

  if (options.showTitle) {
    intentBuilder.setShowTitle(options.showTitle);
  }

  intentBuilder.addDefaultShareMenuItem(); /// Adds a default share item to the menu.
  intentBuilder.enableUrlBarHiding(); /// Enables the url bar to hide as the user scrolls down on the page.

  wv.loadUrl(options.url);
}

export interface AdvancedWebViewOptions {
  url: string;
  toolbarColor?: string;
  showTitle?: boolean;
  isClosed?: Function;
}
