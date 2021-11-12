export enum AdvancedWebviewEvents {
  LoadStarted = 'LoadStarted',
  LoadFinished = 'LoadFinished',
  LoadError = 'LoadError',
  Closed = 'Closed'
}

export interface AdvancedWebViewOptions {
  url: string;
  showTitle?: boolean;
  toolbarColor?: string;
  toolbarControlsColor?: string;
  ios?: {
    viewController?: UIViewController;
  };
}
