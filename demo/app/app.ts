import * as application from 'tns-core-modules/application';
import { init } from 'nativescript-advanced-webview';
init();
application.start({ moduleName: 'main-page' });
