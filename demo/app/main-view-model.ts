import { isIOS, Observable, Page } from '@nativescript/core';
import {
  AdvancedWebViewOptions,
  openAdvancedUrl
} from 'nativescript-advanced-webview';

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
        url: 'https://nativescript.org',
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
