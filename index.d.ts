/**
 * Open the Advanced WebView url
 * @param {AdvancedWebViewOptions}
 */
export function openAdvancedUrl(options: AdvancedWebViewOptions): void;

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
     * Set true to show the site title.
     */
    showTitle?: boolean;
}
