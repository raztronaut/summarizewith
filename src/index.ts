/**
 * Summarize With AI Widget
 * 
 * A lightweight, embeddable widget to summarize web pages with AI services.
 * 
 * @example Script Tag Usage
 * ```html
 * <div id="summarize-widget"></div>
 * <script src="summarize-widget.iife.js"></script>
 * <script>
 *   SummarizeWidget.init({
 *     target: '#summarize-widget',
 *     theme: 'light',
 *     mode: 'url',
 *     services: ['chatgpt', 'claude', 'perplexity']
 *   });
 * </script>
 * ```
 * 
 * @example Web Component Usage
 * ```html
 * <script src="summarize-widget.iife.js"></script>
 * <summarize-with-ai theme="dark" mode="content"></summarize-with-ai>
 * ```
 * 
 * @example npm Usage
 * ```js
 * import { SummarizeWidget } from 'summarize-with-ai';
 * SummarizeWidget.init({ target: '#widget', theme: 'minimal' });
 * ```
 */

import { SummarizeWidget } from './summarize-widget';
import { SummarizeWithAIElement } from './web-component';

// Re-export types
export type { SummarizeWidgetOptions, ServiceId, ClickContext } from './types';

// Export the main widget API
export { SummarizeWidget };

// Check for DOM environment before registering web component
const hasDOM = typeof window !== 'undefined' && typeof document !== 'undefined';

if (hasDOM && 'customElements' in window) {
  // Guard against double registration (hot reload, duplicate scripts, etc.)
  if (!customElements.get('summarize-with-ai')) {
    customElements.define('summarize-with-ai', SummarizeWithAIElement);
  }
}


