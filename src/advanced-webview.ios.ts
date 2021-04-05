import { Color } from '@nativescript/core';

@NativeClass()
class SFSafariViewControllerDelegateImpl
  extends NSObject
  implements SFSafariViewControllerDelegate {
  public static ObjCProtocols = [SFSafariViewControllerDelegate];

  private _owner: WeakRef<any>;
  private _callback: Function;
  public static initWithOwnerCallback(
    owner: WeakRef<any>,
    callback: Function
  ): SFSafariViewControllerDelegateImpl {
    const delegate = <SFSafariViewControllerDelegateImpl>(
      SFSafariViewControllerDelegateImpl.new()
    );
    delegate._owner = owner;
    delegate._callback = callback;
    return delegate;
  }

  safariViewControllerDidCompleteInitialLoad(
    controller: SFSafariViewController,
    didLoadSuccessfully: boolean
  ): void {
    console.log(
      'Delegate, safariViewControllerDidCompleteInitialLoad: ' +
        didLoadSuccessfully
    );
  }

  safariViewControllerDidFinish(controller: SFSafariViewController): void {
    if (this._callback && typeof this._callback === 'function') {
      this._callback(true);
    }
  }
}

export function init() {}

export function openAdvancedUrl(options: AdvancedWebViewOptions): void {
  if (!options.url) {
    throw new Error('No url set in the Advanced WebView Options object.');
  }

  const sfc = SFSafariViewController.alloc().initWithURL(
    NSURL.URLWithString(options.url)
  );

  if (options.toolbarColor) {
    sfc.preferredBarTintColor = new Color(options.toolbarColor).ios;
  }

  if (options.toolbarControlsColor) {
    sfc.preferredControlTintColor = new Color(options.toolbarControlsColor).ios;
  }

  sfc.delegate = SFSafariViewControllerDelegateImpl.initWithOwnerCallback(
    new WeakRef({}),
    options.isClosed
  );

  const app = UIApplication.sharedApplication;

  const animated = true;
  const completionHandler = null;
  let ctrl = app.keyWindow.rootViewController;
  if (options.ios?.viewController) ctrl = options.ios.viewController;
  ctrl.presentViewControllerAnimatedCompletion(
    sfc,
    animated,
    completionHandler
  );
}

export interface AdvancedWebViewOptions {
  url: string;
  showTitle?: boolean;
  toolbarColor?: string;
  toolbarControlsColor?: string;
  isClosed?: Function;
  ios?: {
    viewController?: UIViewController;
  };
}
