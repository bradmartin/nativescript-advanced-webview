import { Observable } from "data/observable";
import { topmost } from 'ui/frame';
import { Page } from 'ui/page';
import { isIOS } from 'platform';
import { openAdvancedUrl, AdvancedWebViewOptions } from 'nativescript-advanced-webview';

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

            let opt: AdvancedWebViewOptions = {
                url: 'https://bradmartin.net',
                showTitle: true,
                toolbarColor: '#336699',
                toolbarControlsColor: '#333'
            };

            let advWeb = openAdvancedUrl(opt);

        } catch (error) {
            console.log(error);
        }
    }

}