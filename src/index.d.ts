import { Observable } from '@nativescript/core';
export declare const NSAdvancedWebViewEventEmitter: Observable;

/**
 * Open the Advanced WebView - Safari on iOS and Chrome on Android.
 * If the browser is not installed on the device, it should fall back to a webview.
 * @param {AdvancedWebViewOptions}
 */
export function openAdvancedUrl(options: AdvancedWebViewOptions): void;

export function init(): void;

export interface AdvancedWebViewOptions {
  /**
   * The url of the site to open.
   */
  url: string;

  /**
   * The color of the toolbar.
   */
  toolbarColor?: string;

  /**
   * Set true to show the site title. *** ANDROID ONLY ***
   */
  showTitle?: boolean;

  /**
   * The color of the toolbar controls. *** iOS ONLY ***
   */
  toolbarControlsColor?: string;

  ios?: {
    /**
     * The UIViewController to present from.
     */
    viewController?: UIViewController;
  };
}

export declare enum AdvancedWebviewEvents {
  LoadStarted = 'LoadStarted',
  LoadFinished = 'LoadFinished',
  LoadError = 'LoadError',
  Closed = 'Closed'
}
