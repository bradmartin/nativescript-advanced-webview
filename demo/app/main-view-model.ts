import { AdvancedWebViewOptions, openAdvancedUrl } from 'nativescript-advanced-webview';
import { Observable } from 'tns-core-modules/data/observable';
import { isIOS } from 'tns-core-modules/platform';
import { Page } from 'tns-core-modules/ui/page';

export class HelloWorldModel extends Observable {
	public openUrlButtonText: string;

	constructor(page: Page) {
		super();

		if (isIOS) {
			this.openUrlButtonText = 'Open Safari View Controller';
		} else {
			this.openUrlButtonText = 'Open Chrome Custom Tabs';
		}
	}

	public onTap() {
		try {
			const opt: AdvancedWebViewOptions = {
				url: 'https://bradmartin.net',
				showTitle: false,
				toolbarColor: '#ff9999',
				toolbarControlsColor: '#fff',
				isClosed: closed => {
					console.log('closed', closed);
				}
			};

			openAdvancedUrl(opt);
		} catch (error) {
			console.log(error);
		}
	}
}
