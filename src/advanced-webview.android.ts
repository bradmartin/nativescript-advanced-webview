/**********************************************************************************
 * (c) 2016, Brad Martin.
 * Licensed under the MIT license.
 *
 * Version 2.0.4                                          bradwaynemartin@gmail.com
 **********************************************************************************/

import { Color } from 'tns-core-modules/color';
import * as app from 'tns-core-modules/application';
import * as utils from 'tns-core-modules/utils/utils';
const REQUEST_CODE = 1868;
export function init() {
	co.fitcom.fancywebview.AdvancedWebView.init(utils.ad.getApplicationContext(), true);
}

export function openAdvancedUrl(options: AdvancedWebViewOptions): void {
	if (!options.url) {
		throw new Error('No url set in the Advanced WebView Options object.');
	}
	app.android.on(app.AndroidApplication.activityResultEvent, (args: any) => {
		const requestCode = args.requestCode;
		const resultCode = args.resultCode;
		if (requestCode === REQUEST_CODE) {
			if (resultCode === android.app.Activity.RESULT_CANCELED) {
				if (options.isClosed && typeof options.isClosed === 'function') {
					options.isClosed(true);
				}
				app.android.off(app.AndroidApplication.activityResultEvent);
			}
		}
	});

	let activity = app.android.startActivity || app.android.foregroundActivity;
	let client;
	const i = new co.fitcom.fancywebview.AdvancedWebViewListener({
		onCustomTabsServiceConnected(componentName: android.content.ComponentName, client: any) {},
		onServiceDisconnected(componentName: android.content.ComponentName) {},
		onNavigationEvent: function(navigationEvent: number, extras: android.os.Bundle) {
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
	let intentBuilder = wv.getBuilder();
	if (intentBuilder) {
		if (options.toolbarColor) {
			intentBuilder.setToolbarColor(new Color(options.toolbarColor).android);
		}

		if (options.showTitle) {
			intentBuilder.setShowTitle(options.showTitle);
		}

		intentBuilder.addDefaultShareMenuItem(); /// Adds a default share item to the menu.
		intentBuilder.enableUrlBarHiding(); /// Enables the url bar to hide as the user scrolls down on the page.
	}
	wv.loadUrl(options.url);
}

export interface AdvancedWebViewOptions {
	url: string;
	toolbarColor?: string;
	showTitle?: boolean;
	isClosed?: Function;
}
