import { Color, Frame, Observable } from '@nativescript/core';
import { AdvancedWebviewEvents, AdvancedWebViewOptions } from './interfaces';

export { AdvancedWebviewEvents } from './interfaces';
export const NSAdvancedWebViewEventEmitter = new Observable();

let ctrl: UIViewController;

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

  sfc.delegate = SFSafariViewControllerDelegateImpl.initWithOwnerCallback(
    new WeakRef({}),
    null
  );

  ctrl = Frame.topmost().viewController;
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
