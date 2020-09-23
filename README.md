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
import { openAdvancedUrl, AdvancedWebViewOptions } from 'nativescript-advanced-webview';

public whateverYouLike() {

    const opts: AdvancedWebViewOptions = {
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        toolbarColor: '#ff4081',
        toolbarControlsColor: '#333', // iOS only
        showTitle: false, // Android only
        isClosed: (res) => {
            console.log('closed it', res);
        }
    };

    openAdvancedUrl(opts);
}
```

#### Javascript

Initiate the service before the app starts e.g app.ts, main.ts

```javascript
var AdvancedWebView = require('nativescript-advanced-webview');

AdvancedWebView.init();
```

```javascript
exports.whateverYouLike = function(args){
    var opts = {
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        toolbarColor: '#ff4081',
        toolbarControlsColor: '#333', // iOS only
        showTitle: false, // Android only
        isClosed: function (res) {
            console.log('closed it', res);
        }
    };

   AdvancedWebView.openAdvancedUrl(opts);
```

### API

- openAdvancedUrl(options: AdvancedWebViewOptions)

##### AdvancedWebViewOptions Properties

- url: string
- toolbarColor: string
- toolbarControlsColor: string - ** iOS only **
- showTitle: boolean - ** Android only **
- isClosed: Function - callback when the browser closes

##### Demo App

- fork the repo
- cd into the `src` directory
- execute `npm run demo.android` or `npm run demo.ios`
