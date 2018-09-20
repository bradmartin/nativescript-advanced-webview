import { Observable } from 'tns-core-modules/data/observable';
import { Page } from 'tns-core-modules/ui/page';
import { isIOS } from 'tns-core-modules/platform';
import { openAdvancedUrl, AdvancedWebViewOptions } from 'nativescript-advanced-webview';

export class HelloWorldModel extends Observable {
	public openUrlButtonText: string;

	public openCloseUrlButtonText: string;
	
	private _opt: AdvancedWebViewOptions = {
		url: 'https://bradmartin.net',
		showTitle: true,
		toolbarColor: '#336699',
		toolbarControlsColor: '#333',
		isClosed: closed => {
			console.log(closed);
		}
	};

	constructor(page: Page) {
		super();

		if (isIOS) {
			this.openUrlButtonText = 'Open Safari View Controller';
			this.openCloseUrlButtonText = 'Open then Close Safari View Controller';
		} else {
			this.openUrlButtonText = 'Open Chrome Custom Tabs';
		}
	}
	
	public onOpenTap() {
		try {
			openAdvancedUrl(this._opt);
		} catch (error) {
			console.log(error);
		}
	}
	
	public onOpenCloseTap() {
		try {
			const advancedWebView = openAdvancedUrl(this._opt);
			setTimeout(advancedWebView.close, 5000);
		} catch (error) {
			console.log(error);
		}
	}
}
