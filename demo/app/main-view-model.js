"use strict";
var observable = require("data/observable");
var nativescript_advanced_webview_1 = require('nativescript-advanced-webview');
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        _super.call(this);
        // Initialize default values.
        this._counter = 42;
        this.updateMessage();
    }
    Object.defineProperty(HelloWorldModel.prototype, "message", {
        get: function () {
            return this._message;
        },
        set: function (value) {
            if (this._message !== value) {
                this._message = value;
                this.notifyPropertyChange("message", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    HelloWorldModel.prototype.updateMessage = function () {
        if (this._counter <= 0) {
            this.message = "Hoorraaay! You unlocked the NativeScript clicker achievement!";
        }
        else {
            this.message = this._counter + " taps left";
        }
    };
    HelloWorldModel.prototype.onTap = function () {
        var opt = {
            url: 'https://bradmartin.net',
            showTitle: true,
            toolbarColor: '#3489db'
        };
        var advWeb = nativescript_advanced_webview_1.openAdvancedWebView(opt);
    };
    return HelloWorldModel;
}(observable.Observable));
exports.HelloWorldModel = HelloWorldModel;
//# sourceMappingURL=main-view-model.js.map