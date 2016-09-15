/**********************************************************************************
* (c) 2016, Brad Martin.
* Licensed under the MIT license.
*
* Version 1.0.0                                           bradwaynemartin@gmail.com
**********************************************************************************/
'use strict';

import { Color } from 'color';
import { topmost } from 'ui/frame';
import * as app from 'application';

declare var SFSafariViewController: any;


export function openAdvancedUrl(options: AdvancedWebViewOptions) {
    // make sure url is passed
    if (options.url) {

        try {
            let x = SFSafariViewController.alloc().initWithURL(
                NSURL.URLWithString('https://bradmartin.net')
            );

            let parent = this._Parent;

            let controller = topmost().ios.controller;
            console.log('CONTROLLER: ' + controller);


            x.delegate = controller;

            console.log('parent ios: ' + this._Parent);

        } catch (error) {

        }

    } else {
        throw new Error('No url set in the Advanced WebView Options object.');
    }

}




export interface AdvancedWebViewOptions {
    url: string;
    toolbarColor?: string;
    showTitle?: boolean;
}
