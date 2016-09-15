import { Observable } from "data/observable";
import { topmost } from 'ui/frame';
import { Page } from 'ui/page';
import { openAdvancedUrl, AdvancedWebViewOptions } from 'nativescript-advanced-webview';

declare var SFSafariViewController, NSURL: any;

export class HelloWorldModel extends Observable {

    private _Parent: Page;

    constructor(page: Page) {
        super();
        this._Parent = page;
    }


    public onTap() {
        try {

            let opt: AdvancedWebViewOptions = {
                url: 'https://bradmartin.net',
                showTitle: true,
                toolbarColor: '#3489db'
            };

            let advWeb = openAdvancedUrl(opt);

        } catch (error) {
            console.log(error);
        }
    }

}