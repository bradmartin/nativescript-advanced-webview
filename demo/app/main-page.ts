import { EventData } from 'tns-core-modules/data/observable';
import { Page } from 'tns-core-modules/ui/page';
import { HelloWorldModel } from './main-view-model';

// Event handler for Page "navigatedTo" event attached in main-page.xml
export function navigatedTo(args: EventData) {
	// Get the event sender
	const page = <Page>args.object;
	page.bindingContext = new HelloWorldModel(page);
}
