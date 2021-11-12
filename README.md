<a align="center" href="https://www.npmjs.com/package/nativescript-advanced-webview">
    <h3 align="center">NativeScript Advanced Webview</h3>
</a>
<h4 align="center">
An advanced webview using <a href="https://developer.chrome.com/multidevice/android/customtabs#whatarethey">Chrome Custom Tabs</a> on Android and <a href="https://developer.apple.com/reference/safariservices/sfsafariviewcontroller?language=objc">SFSafariViewController</a> on iOS.
</h4>

<p align="center">
    <a href="https://www.npmjs.com/package/nativescript-advanced-webview">
        <img src="https://img.shields.io/npm/v/nativescript-advanced-webview.svg" alt="npm">
    </a>
    <a href="https://www.npmjs.com/package/nativescript-advanced-webview">
        <img src="https://img.shields.io/npm/dt/nativescript-advanced-webview.svg?label=npm%20downloads" alt="npm">
    </a>
    <a href="https://github.com/bradmartin/nativescript-advanced-webview/stargazers">
        <img src="https://img.shields.io/github/stars/bradmartin/nativescript-advanced-webview.svg" alt="stars">
    </a>
</p>

## Installation

To install execute:

#### NativeScript 7+:

```bash
ns plugin add nativescript-advanced-webview
```

#### NativeScript < 7:

```bash
tns plugin add nativescript-advanced-webview@5.0.0
```

[Here is a video](https://youtu.be/LVseK_CZp5g) showing off Chrome CustomTabs in NativeScript.

#### Android

[CustomTabs](https://developer.android.com/reference/android/support/customtabs/package-summary.html)

#### iOS

[SFSafariViewController](https://developer.apple.com/reference/safariservices/sfsafariviewcontroller?language=objc)

### Why use this? Because Perf Matters

[Android Comparison](https://developer.chrome.com/multidevice/images/customtab/performance.gif)

### Demo

| Android                                   | iOS                                             |
| ----------------------------------------- | ----------------------------------------------- |
| ![Android Sample](screens/chromeTabs.gif) | ![iOS Sample](screens/safariViewController.gif) |

## Example

#### TypeScript

Initiate the service before the app starts e.g app.ts, main.ts

```typescript
import { init } from 'nativescript-advanced-webview';
init();
```

```typescript
import {
  AdvancedWebviewEvents,
  AdvancedWebViewOptions,
  init,
  NSAdvancedWebViewEventEmitter,
  openAdvancedUrl
} from 'nativescript-advanced-webview';

function whateverYouLike() {
  NSAdvancedWebViewEventEmitter.once(AdvancedWebviewEvents.LoadStarted, () => {
    console.log('LOAD STARTED');
  });

  NSAdvancedWebViewEventEmitter.once(AdvancedWebviewEvents.LoadFinished, () => {
    console.log('LOAD FINISHED');
  });

  NSAdvancedWebViewEventEmitter.once(AdvancedWebviewEvents.LoadError, () => {
    console.log('LOAD ERROR');
  });

  NSAdvancedWebViewEventEmitter.once(AdvancedWebviewEvents.Closed, () => {
    console.log('CLOSED');
  });

  const opts: AdvancedWebViewOptions = {
    url: 'https://nativescript.org',
    showTitle: true,
    toolbarColor: '#336699',
    toolbarControlsColor: '#fff'
  };

  openAdvancedUrl(opts);
}
```

### API

- openAdvancedUrl(options: AdvancedWebViewOptions)
- close() _ iOS Only _ :: Closed the safari view controller.

#### AdvancedWebViewOptions Properties

- url: string
- toolbarColor: string
- toolbarControlsColor: string - ** iOS only **
- showTitle: boolean - ** Android only **

#### Events

- LoadStart
- LoadFinished
- LoadError
- Closed

##### Demo App

- fork the repo
- cd into the `src` directory
- execute `npm run demo.android` or `npm run demo.ios`
