/// <reference path="./_helpers.d.ts" />
import androidcontentContext = android.content.Context;
import androidsupportcustomtabsCustomTabsClient = androidx.browser.customtabs.CustomTabsClient;
import androidsupportcustomtabsCustomTabsSession = androidx.browser.customtabs.CustomTabsSession;
import androidsupportcustomtabsCustomTabsIntentBuilder = androidx.browser.customtabs.CustomTabsIntent.Builder;
/// <reference path="./android.content.Context.d.ts" />
/// <reference path="./android.support.customtabs.CustomTabsClient.d.ts" />
/// <reference path="./android.support.customtabs.CustomTabsSession.d.ts" />
/// <reference path="./co.fitcom.fancywebview.AdvancedWebViewListener.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
declare namespace co {
	export namespace fitcom {
		export namespace fancywebview {
			export class AdvancedWebView {
				public static PACKAGE_NAME: string;
				public constructor(param0: androidcontentContext, param1: co.fitcom.fancywebview.AdvancedWebViewListener);
				public loadUrl(param0: string): void;
				public getSession(): androidsupportcustomtabsCustomTabsSession;
				public static init(param0: androidcontentContext, param1: boolean): void;
				public getBuilder(): androidsupportcustomtabsCustomTabsIntentBuilder;
				public setBuilder(builder: androidsupportcustomtabsCustomTabsIntentBuilder): void;
				public setWebViewListener(param0: co.fitcom.fancywebview.AdvancedWebViewListener): void;
				public setCustomTabsClient(param0: androidsupportcustomtabsCustomTabsClient): void;
				public getCustomTabsClient(): androidsupportcustomtabsCustomTabsClient;
			}
		}
	}
}

declare namespace co {
	export namespace fitcom {
		export namespace fancywebview {
			export class AdvancedWebViewStatics {
				public init(context: android.content.Context, enabled: boolean): void;
			}
		}
	}
}

import androidcontentComponentName = android.content.ComponentName;
import androidosBundle = android.os.Bundle;
/// <reference path="./android.content.ComponentName.d.ts" />
/// <reference path="./android.os.Bundle.d.ts" />
/// <reference path="./android.support.customtabs.CustomTabsClient.d.ts" />
declare namespace co {
	export namespace fitcom {
		export namespace fancywebview {
			export class AdvancedWebViewListener {
				/**
				 * Constructs a new instance of the co.fitcom.fancywebview.AdvancedWebViewListener interface with the provided implementation.
				 */
				public constructor(implementation: {
					onCustomTabsServiceConnected(
						param0: androidcontentComponentName,
						param1: androidsupportcustomtabsCustomTabsClient
					): void;
					onServiceDisconnected(param0: androidcontentComponentName): void;
					onNavigationEvent(param0: number, param1: androidosBundle): void;
				});
				public onCustomTabsServiceConnected(
					param0: androidcontentComponentName,
					param1: androidsupportcustomtabsCustomTabsClient
				): void;
				public onNavigationEvent(param0: number, param1: androidosBundle): void;
				public onServiceDisconnected(param0: androidcontentComponentName): void;
			}
		}
	}
}

declare namespace co {
	export namespace fitcom {
		export namespace fancywebview {
			export class BuildConfig {
				public static DEBUG: boolean;
				public static APPLICATION_ID: string;
				public static BUILD_TYPE: string;
				public static FLAVOR: string;
				public static VERSION_CODE: number;
				public static VERSION_NAME: string;
				public constructor();
			}
		}
	}
}

/// <reference path="./android.os.Bundle.d.ts" />
/// <reference path="./co.fitcom.fancywebview.AdvancedWebViewListener.d.ts" />
declare namespace co {
	export namespace fitcom {
		export namespace fancywebview {
			export class CustomTabsCallbackListener {
				public onNavigationEvent(param0: number, param1: androidosBundle): void;
				public constructor(param0: co.fitcom.fancywebview.AdvancedWebViewListener);
				public setWebViewListener(param0: co.fitcom.fancywebview.AdvancedWebViewListener): void;
			}
		}
	}
}

/// <reference path="./android.content.ComponentName.d.ts" />
/// <reference path="./android.support.customtabs.CustomTabsClient.d.ts" />
/// <reference path="./co.fitcom.fancywebview.AdvancedWebViewListener.d.ts" />
declare namespace co {
	export namespace fitcom {
		export namespace fancywebview {
			export class CustomTabsServiceConnectionCallBack {
				public onCustomTabsServiceConnected(
					param0: androidcontentComponentName,
					param1: androidsupportcustomtabsCustomTabsClient
				): void;
				public onServiceDisconnected(param0: androidcontentComponentName): void;
				public constructor(param0: co.fitcom.fancywebview.AdvancedWebViewListener, param1: boolean);
				public setWebViewListener(param0: co.fitcom.fancywebview.AdvancedWebViewListener): void;
				public getCustomTabsClient(): androidsupportcustomtabsCustomTabsClient;
			}
		}
	}
}
