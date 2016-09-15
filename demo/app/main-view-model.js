"use strict";
var observable = require("data/observable");
var frame = require('ui/frame');
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel(page) {
        _super.call(this);
        this._Parent = page;
    }
    HelloWorldModel.prototype.onTap = function () {
        try {
            debugger;
            var x = SFSafariViewController.alloc().initWithURL(NSURL.URLWithString('https://bradmartin.net'));
            var parent_1 = this._Parent;
            var controller = frame.topmost().ios.controller;
            console.log('CONTROLLER: ' + controller);
            x.delegate = controller;
            console.log('parent ios: ' + this._Parent);
            // parent.ios.presentViewController(x, true, null);
            console.log(x);
        }
        catch (error) {
            console.log(error);
        }
        // let opt: AdvancedWebViewOptions = {
        //     url: 'https://bradmartin.net',
        //     showTitle: true,
        //     toolbarColor: '#3489db'
        // };
        // let advWeb = openAdvancedUrl(opt);
    };
    return HelloWorldModel;
}(observable.Observable));
exports.HelloWorldModel = HelloWorldModel;
//# sourceMappingURL=main-view-model.js.map