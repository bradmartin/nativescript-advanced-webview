'use strict';
var color_1 = require('color');
var app = require('application');
var CustomTabsIntent = android.support.customtabs.CustomTabsIntent;
var Uri = android.net.Uri;
function openAdvancedUrl(options) {
    if (options.url) {
        var activity = app.android.startActivity || app.android.foregroundActivity;
        var builder = new CustomTabsIntent.Builder();
        if (options.toolbarColor) {
            builder.setToolbarColor(new color_1.Color(options.toolbarColor).android);
        }
        if (options.showTitle) {
            builder.setShowTitle(options.showTitle);
        }
        builder.addDefaultShareMenuItem();
        builder.enableUrlBarHiding();
        var customTabsIntent = builder.build();
        customTabsIntent.launchUrl(activity, Uri.parse(options.url));
    }
    else {
        throw new Error('No url set in the Advanced WebView Options object.');
    }
}
exports.openAdvancedUrl = openAdvancedUrl;
