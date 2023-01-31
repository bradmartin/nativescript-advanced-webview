import { Color, Observable } from '@nativescript/core';
import { getRootView } from '@nativescript/core/application';
import { AdvancedWebviewEvents, AdvancedWebViewOptions } from './interfaces';

export { AdvancedWebviewEvents } from './interfaces';
export const NSAdvancedWebViewEventEmitter = new Observable();

let ctrl: UIViewController;
let delegate: SFSafariViewControllerDelegateImpl;

@NativeClass()
class SFSafariViewControllerDelegateImpl
  extends NSObject
  implements SFSafariViewControllerDelegate
{
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

  /**
   * Tells the delegate that the initial URL load completed.
   * @param controller
   * @param didLoadSuccessfully
   */
  safariViewControllerDidCompleteInitialLoad(
    controller: SFSafariViewController,
    didLoadSuccessfully: boolean
  ): void {
    if (didLoadSuccessfully === true) {
      NSAdvancedWebViewEventEmitter.notify({
        eventName: AdvancedWebviewEvents.LoadFinished
      });
    } else {
      NSAdvancedWebViewEventEmitter.notify({
        eventName: AdvancedWebviewEvents.LoadError
      });
    }
  }

  /**
   * Tells the delegate that the user dismissed the view.
   */
  safariViewControllerDidFinish(controller: SFSafariViewController): void {
    NSAdvancedWebViewEventEmitter.notify({
      eventName: AdvancedWebviewEvents.Closed
    });
    delegate = null;
  }
}

export function init() {
  console.log('init not needed on iOS.');
}

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

  delegate = SFSafariViewControllerDelegateImpl.initWithOwnerCallback(
    new WeakRef({}),
    null
  );
  sfc.delegate = delegate;

  ctrl = getRootView().viewController as UIViewController;
  if (options.ios?.viewController) {
    ctrl = options.ios.viewController;
  }

  ctrl.presentViewControllerAnimatedCompletion(sfc, true, null);

  NSAdvancedWebViewEventEmitter.notify({
    eventName: AdvancedWebviewEvents.LoadStarted
  });
}

export function close() {
  if (ctrl) {
    ctrl.dismissModalViewControllerAnimated(true);
  }
}
