"use strict";
var observable_1 = require("data/observable");
var platform_1 = require('platform');
var nativescript_advanced_webview_1 = require('nativescript-advanced-webview');
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel(page) {
        _super.call(this);
        if (platform_1.isIOS) {
            this.openUrlButtonText = 'Open Safari View Controller';
        }
        else {
            this.openUrlButtonText = 'Open Chrome Custom Tabs';
        }
    }
    HelloWorldModel.prototype.onTap = function () {
        try {
            var opt = {
                url: 'https://bradmartin.net',
                showTitle: true,
                toolbarColor: '#336699',
                toolbarControlsColor: '#333'
            };
            var advWeb = nativescript_advanced_webview_1.openAdvancedUrl(opt);
        }
        catch (error) {
            console.log(error);
        }
    };
    return HelloWorldModel;
}(observable_1.Observable));
exports.HelloWorldModel = HelloWorldModel;
//# sourceMappingURL=main-view-model.js.map