/// <reference path="./_helpers.d.ts" />
import androidcontentContext = android.content.Context;
import androidnetUri = android.net.Uri;
import androidsupportcustomtabsCustomTabsClient = android.support.customtabs.CustomTabsClient;
import androidsupportcustomtabsCustomTabsSession = android.support.customtabs.CustomTabsSession;
import androidsupportcustomtabsCustomTabsIntent = android.support.customtabs.CustomTabsIntent;
import androidsupportcustomtabsCustomTabsIntentBuilder = android.support.customtabs.CustomTabsIntent.Builder;

import androidcontentComponentName = android.content.ComponentName;
import androidosBundle = android.os.Bundle;

/// <reference path="./android.content.Context.d.ts" />
/// <reference path="./android.support.customtabs.CustomTabsClient.d.ts" />
/// <reference path="./android.support.customtabs.CustomTabsSession.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
declare namespace android {
	export namespace support {
		export namespace customtabs {
			export declare class CustomTabsIntent {
				launchUrl(context: androidcontentContext, url: androidnetUri): void;
			}
			export declare class CustomTabsClient {
				warmup(time: number);
				static bindCustomTabsService(
					context: androidcontentContext,
					packageName: string,
					connection: CustomTabsServiceConnection
				): boolean;
			}
			export class CustomTabsServiceConnection {
				constructor(implementation: CustomTabsServiceConnection);
				onCustomTabsServiceConnected(
					componentName: androidcontentComponentName,
					customTabsClient: androidsupportcustomtabsCustomTabsClient
				): void;
				onCustomTabsServiceDisconnected(componentName: androidcontentComponentName): void;
			}
		}
	}
}

declare namespace android {
	export namespace net {
		declare class Uri {
			static parse(url: string): androidnetUri;
		}
	}
}
import { Syntax } from 'tns-core-modules/js-libs/esprima';
/// <reference path="./android.content.ComponentName.d.ts" />
/// <reference path="./android.os.Bundle.d.ts" />
/// <reference path="./android.support.customtabs.CustomTabsClient.d.ts" />
declare namespace android {
	export namespace support {
		export namespace customtabs {
			declare namespace CustomTabsIntent {
				declare class Builder {
					constructor();
					setShowTitle(showTitle: boolean): this;
					setToolbarColor(color: number): this;
					addDefaultShareMenuItem(): this;
					enableUrlBarHiding(): this;
					build(): androidsupportcustomtabsCustomTabsIntent;
				}
			}
		}
	}
}

/// <reference path="./android.os.Bundle.d.ts" />

/// <reference path="./android.content.ComponentName.d.ts" />
/// <reference path="./android.support.customtabs.CustomTabsClient.d.ts" />
