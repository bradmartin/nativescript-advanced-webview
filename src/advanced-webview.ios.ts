/**********************************************************************************
 * (c) 2016, Brad Martin.
 * Licensed under the MIT license.
 *
 * Version 2.0.4                                           bradwaynemartin@gmail.com
 **********************************************************************************/

import { Color } from 'tns-core-modules/color';
import * as utils from 'tns-core-modules/utils/utils';

class SFSafariViewControllerDelegateImpl extends NSObject implements SFSafariViewControllerDelegate {
	public static ObjCProtocols = [SFSafariViewControllerDelegate];

	private _owner: WeakRef<any>;
	private _callback: Function;
	public static initWithOwnerCallback(owner: WeakRef<any>, callback: Function): SFSafariViewControllerDelegateImpl {
		let delegate = <SFSafariViewControllerDelegateImpl>SFSafariViewControllerDelegateImpl.new();
		delegate._owner = owner;
		delegate._callback = callback;
		return delegate;
	}

	safariViewControllerDidCompleteInitialLoad(controller: SFSafariViewController, didLoadSuccessfully: boolean): void {
		console.log('Delegate, safariViewControllerDidCompleteInitialLoad: ' + didLoadSuccessfully);
	}

	safariViewControllerDidFinish(controller: SFSafariViewController): void {
		if (this._callback && typeof this._callback === 'function') {
			this._callback(true);
		}
	}
}

export function init() {}

export function openAdvancedUrl(options: AdvancedWebViewOptions): void {
	if (!options.url) {
		throw new Error('No url set in the Advanced WebView Options object.');
	}

	let sfc = SFSafariViewController.alloc().initWithURL(NSURL.URLWithString(options.url));

	if (options.toolbarColor) {
		sfc.preferredBarTintColor = new Color(options.toolbarColor).ios;
	}

	if (options.toolbarControlsColor) {
		sfc.preferredControlTintColor = new Color(options.toolbarControlsColor).ios;
	}

	sfc.delegate = SFSafariViewControllerDelegateImpl.initWithOwnerCallback(new WeakRef({}), options.isClosed);

	let app = utils.ios.getter(UIApplication, UIApplication.sharedApplication);

	const animated = true;
	const completionHandler = null;
	app.keyWindow.rootViewController.presentViewControllerAnimatedCompletion(sfc, animated, completionHandler);
}

export interface AdvancedWebViewOptions {
	url: string;
	showTitle?: boolean;
	toolbarColor?: string;
	toolbarControlsColor?: string;
	isClosed?: Function;
}
