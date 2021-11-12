import { EventData, Page } from '@nativescript/core';
import { HelloWorldModel } from './main-view-model';

// Event handler for Page "navigatedTo" event attached in main-page.xml
export function navigatedTo(args: EventData) {
  // Get the event sender
  const page = <Page>args.object;
  page.bindingContext = new HelloWorldModel(page);
}
