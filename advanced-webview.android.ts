/**********************************************************************************
 * (c) 2016, Brad Martin.
 * Licensed under the MIT license.
 *
 * Version 1.0.0                                           bradwaynemartin@gmail.com
 **********************************************************************************/
("use strict");

import { Color } from "tns-core-modules/color";
import * as app from "tns-core-modules/application";

declare const android: any;

const CustomTabsIntent = android.support.customtabs.CustomTabsIntent;
const Uri = android.net.Uri;

export function openAdvancedUrl(options: AdvancedWebViewOptions) {
  if (!options.url) {
    throw new Error("No url set in the Advanced WebView Options object.");
  }

  let activity = app.android.startActivity || app.android.foregroundActivity;
  let intentBuilder = new CustomTabsIntent.Builder();

  if (options.toolbarColor) {
    intentBuilder.setToolbarColor(new Color(options.toolbarColor).android);
  }

  if (options.showTitle) {
    intentBuilder.setShowTitle(options.showTitle);
  }

  intentBuilder.addDefaultShareMenuItem(); /// Adds a default share item to the menu.
  intentBuilder.enableUrlBarHiding(); /// Enables the url bar to hide as the user scrolls down on the page.

  let pm = app.android.context.getPackageManager();

  try {
    let isChrome;
    isChrome = pm.getApplicationInfo("com.android.chrome", 0);
    if (isChrome.enabled) {
      // So chrome has installed and enabled
      let intent = intentBuilder.build().intent;
      intent.setPackage("com.android.chrome");
      intentBuilder.build().launchUrl(activity, Uri.parse(options.url));
    } else {
      // Looks like it installed but not enabled. So we will move for default.
      intentBuilder.build().launchUrl(activity, Uri.parse(options.url));
    }
  } catch (err) {
    // Chrome not found. So we will move for default.
    intentBuilder.build().launchUrl(activity, Uri.parse(options.url));
  }
}

export interface AdvancedWebViewOptions {
  url: string;
  toolbarColor?: string;
  showTitle?: boolean;
}
