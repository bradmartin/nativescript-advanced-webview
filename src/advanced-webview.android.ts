/**********************************************************************************
 * (c) 2016, Brad Martin.
 * Licensed under the MIT license.
 *
 * Version 2.0.4                                          bradwaynemartin@gmail.com
 **********************************************************************************/
/// <reference path="./types/android.d.ts" />

import { Color } from 'tns-core-modules/color';
import * as app from 'tns-core-modules/application';
import * as utils from 'tns-core-modules/utils/utils';
import { android as a } from './types/android';
import CustomTabsClient = a.support.customtabs.CustomTabsClient;
import CustomTabsIntent = a.support.customtabs.CustomTabsIntent;
import CustomTabsServiceConnection = a.support.customtabs.CustomTabsServiceConnection;
const REQUEST_CODE = 1868;
const CUSTOM_TAB_PACKAGE_NAME = 'com.android.chrome';
let client: CustomTabsClient;

export function init() {
	const connection = new CustomTabsServiceConnection({
		onCustomTabsServiceConnected: function(
			componentName: android.content.ComponentName,
			customTabsClient: CustomTabsClient
		) {
			client = customTabsClient;
			client.warmup(long(0));
		},
		onCustomTabsServiceDisconnected: function(componentName: android.content.ComponentName) {
			client = null;
		}
	});

	CustomTabsClient.bindCustomTabsService(
		app.android.startActivity || app.android.foregroundActivity,
		CUSTOM_TAB_PACKAGE_NAME,
		connection
	);
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

	const intentBuilder = new CustomTabsIntent.Builder();
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
	intentBuilder.build().launchUrl(activity, android.net.Uri.parse(options.url));
}

export interface AdvancedWebViewOptions {
	url: string;
	toolbarColor?: string;
	showTitle?: boolean;
	isClosed?: Function;
}
