/**********************************************************************************
* (c) 2016, Brad Martin.
* Licensed under the MIT license.
*
* Version 1.0.0                                           bradwaynemartin@gmail.com
**********************************************************************************/
("use strict");

import { Color } from "color";
import { topmost } from "ui/frame";
import * as app from "application";
import * as utils from "utils/utils";

declare var NSURL,
  UIApplication,
  SFSafariViewController,
  SFSafariViewControllerDelegate: any;

// Delegate stuff
class MyDelegate extends NSObject implements SFSafariViewControllerDelegate {
  public static ObjCProtocols = [SFSafariViewControllerDelegate];

  didCompleteInitialLoad(didLoadSuccessfully: boolean) {
    console.log(didLoadSuccessfully);
  }

  safariViewControllerDidFinish() {
    console.log("did finish");
  }
}

export function openAdvancedUrl(options: AdvancedWebViewOptions) {
  // make sure url is passed
  if (options.url) {
    let sfc = SFSafariViewController.alloc().initWithURL(
      NSURL.URLWithString(options.url)
    );

    if (options.toolbarColor)
      sfc.preferredBarTintColor = new Color(options.toolbarColor).ios;

    if (options.toolbarControlsColor)
      sfc.preferredControlTintColor = new Color(
        options.toolbarControlsColor
      ).ios;

    // sfc.delegate = MyDelegate;

    let app = utils.ios.getter(UIApplication, UIApplication.sharedApplication);

    app.keyWindow.rootViewController.presentViewControllerAnimatedCompletion(
      sfc,
      true,
      null
    );
  } else {
    throw new Error("No url set in the Advanced WebView Options object.");
  }
}

export interface AdvancedWebViewOptions {
  url: string;
  showTitle?: boolean;
  toolbarColor?: string;
  toolbarControlsColor?: string;
}
