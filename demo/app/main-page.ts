import { EventData, Page } from '@nativescript/core/data/observable';
import { init } from 'nativescript-advanced-webview';
import { HelloWorldModel } from './main-view-model';

// Event handler for Page "navigatedTo" event attached in main-page.xml
export function navigatedTo(args: EventData) {
  init(); // init the advanced webview here

  // Get the event sender
  const page = <Page>args.object;
  page.bindingContext = new HelloWorldModel(page);
}
