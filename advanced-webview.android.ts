/**********************************************************************************
* (c) 2016, Brad Martin.
* Licensed under the MIT license.
*
* Version 1.0.0                                           bradwaynemartin@gmail.com
**********************************************************************************/
'use strict';

import { Color } from 'color';
import * as app from 'application';

declare var android: any;

let CustomTabsIntent = android.support.customtabs.CustomTabsIntent;
let Uri = android.net.Uri;


export function openAdvancedUrl(options: AdvancedWebViewOptions) {
  // make sure url is passed
  if (options.url) {
    let activity = app.android.startActivity || app.android.foregroundActivity;
    let builder = new CustomTabsIntent.Builder();

    if (options.toolbarColor) {
      builder.setToolbarColor(new Color(options.toolbarColor).android);
    }

    if (options.showTitle) {
      builder.setShowTitle(options.showTitle);
    }

    builder.addDefaultShareMenuItem(); /// Adds a default share item to the menu.
    builder.enableUrlBarHiding(); /// Enables the url bar to hide as the user scrolls down on the page.

    let customTabsIntent = builder.build();

    customTabsIntent.launchUrl(activity, Uri.parse(options.url));

  } else {
    throw new Error('No url set in the Advanced WebView Options object.');
  }

}




export interface AdvancedWebViewOptions {
  url: string;
  toolbarColor?: string;
  showTitle?: boolean;
}
