import { Observable, Page } from '@nativescript/core';
import {
  AdvancedWebviewEvents,
  AdvancedWebViewOptions,
  init,
  NSAdvancedWebViewEventEmitter,
  openAdvancedUrl
} from 'nativescript-advanced-webview';

export class HelloWorldModel extends Observable {
  public openUrlButtonText: string;

  constructor(page: Page) {
    super();

    init(); // init the advanced webview here

    if (global.isIOS) {
      this.openUrlButtonText = 'Open Safari View Controller';
    } else {
      this.openUrlButtonText = 'Open Chrome Custom Tabs';
    }
  }

  public onTap() {
    try {
      NSAdvancedWebViewEventEmitter.once(
        AdvancedWebviewEvents.LoadStarted,
        () => {
          console.log('LOAD STARTED');
        }
      );

      NSAdvancedWebViewEventEmitter.once(
        AdvancedWebviewEvents.LoadFinished,
        () => {
          console.log('LOAD FINISHED');
        }
      );

      NSAdvancedWebViewEventEmitter.once(
        AdvancedWebviewEvents.LoadError,
        () => {
          console.log('LOAD ERROR');
        }
      );

      NSAdvancedWebViewEventEmitter.once(AdvancedWebviewEvents.Closed, () => {
        console.log('CLOSED');
      });

      const opts: AdvancedWebViewOptions = {
        url: 'https://twitter.com',
        showTitle: true,
        toolbarColor: '#336699',
        toolbarControlsColor: '#fff'
      };

      openAdvancedUrl(opts);
    } catch (error) {
      console.log(error);
    }
  }
}
