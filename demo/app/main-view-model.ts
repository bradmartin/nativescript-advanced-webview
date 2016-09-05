import observable = require("data/observable");
import { openAdvancedUrl, AdvancedWebViewOptions } from 'nativescript-advanced-webview';

export class HelloWorldModel extends observable.Observable {

    private _counter: number;
    private _message: string;

    get message(): string {
        return this._message;
    }
    set message(value: string) {
        if (this._message !== value) {
            this._message = value;
            this.notifyPropertyChange("message", value)
        }
    }

    constructor() {
        super();

        // Initialize default values.
        this._counter = 42;
        this.updateMessage();
    }

    private updateMessage() {
        if (this._counter <= 0) {
            this.message = "Hoorraaay! You unlocked the NativeScript clicker achievement!";
        } else {
            this.message = this._counter + " taps left";
        }
    }

    public onTap() {
        let opt: AdvancedWebViewOptions = {
            url: 'https://bradmartin.net',
            showTitle: true,
            toolbarColor: '#3489db'
        };

        let advWeb = openAdvancedUrl(opt);

    }
}