import type { ServiceId, SummarizeWidgetOptions } from './types';
import { SummarizeWidget } from './summarize-widget';

/**
 * Valid service IDs for type checking
 */
const VALID_SERVICES: ServiceId[] = ['chatgpt', 'claude', 'perplexity', 'gemini', 'grok'];

/**
 * Parse a comma-separated string of service IDs
 */
function parseServices(value: string | null): ServiceId[] | undefined {
  if (!value) return undefined;
  
  return value
    .split(',')
    .map(s => s.trim().toLowerCase())
    .filter((s): s is ServiceId => VALID_SERVICES.includes(s as ServiceId));
}

/**
 * Parse theme attribute
 */
function parseTheme(value: string | null): 'light' | 'dark' | 'minimal' | undefined {
  if (value === 'light' || value === 'dark' || value === 'minimal') {
    return value;
  }
  return undefined;
}

/**
 * Parse mode attribute
 */
function parseMode(value: string | null): 'url' | 'content' | undefined {
  if (value === 'url' || value === 'content') {
    return value;
  }
  return undefined;
}

/**
 * Parse gemini-style attribute
 */
function parseGeminiStyle(value: string | null): 'app' | 'search' | undefined {
  if (value === 'app' || value === 'search') {
    return value;
  }
  return undefined;
}

/**
 * Web Component wrapper for SummarizeWidget
 * 
 * Usage:
 * <summarize-with-ai
 *   theme="dark"
 *   mode="content"
 *   services="chatgpt,claude,perplexity"
 *   prefer-selection="true"
 *   max-chars="4000"
 *   prompt-prefix="As a developer..."
 *   gemini-style="app"
 * ></summarize-with-ai>
 */
export class SummarizeWithAIElement extends HTMLElement {
  private _shadowRoot: ShadowRoot;
  private _rendered = false;

  static get observedAttributes(): string[] {
    return ['theme', 'mode', 'services', 'prefer-selection', 'max-chars', 'prompt-prefix', 'gemini-style'];
  }

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
  }

  connectedCallback(): void {
    this._render();
  }

  attributeChangedCallback(
    _name: string,
    oldValue: string | null,
    newValue: string | null
  ): void {
    // Only re-render if value actually changed and we're already connected
    if (oldValue !== newValue && this._rendered) {
      this._render();
    }
  }

  /**
   * Build options from attributes
   */
  private _getOptions(): Omit<SummarizeWidgetOptions, 'target'> {
    const options: Omit<SummarizeWidgetOptions, 'target'> = {};

    const theme = parseTheme(this.getAttribute('theme'));
    if (theme) options.theme = theme;

    const mode = parseMode(this.getAttribute('mode'));
    if (mode) options.mode = mode;

    const services = parseServices(this.getAttribute('services'));
    if (services?.length) options.services = services;

    const preferSelection = this.getAttribute('prefer-selection');
    if (preferSelection !== null) {
      options.preferSelection = preferSelection !== 'false';
    }

    const maxChars = this.getAttribute('max-chars');
    if (maxChars) {
      const parsed = parseInt(maxChars, 10);
      if (!isNaN(parsed) && parsed > 0) {
        options.maxChars = parsed;
      }
    }

    const promptPrefix = this.getAttribute('prompt-prefix');
    if (promptPrefix) {
      options.promptPrefix = promptPrefix;
    }

    const geminiStyle = parseGeminiStyle(this.getAttribute('gemini-style'));
    if (geminiStyle) options.geminiStyle = geminiStyle;

    return options;
  }

  /**
   * Render the widget into the shadow DOM
   */
  private _render(): void {
    // Clear previous content
    this._shadowRoot.innerHTML = '';
    
    // Get options from attributes
    const options = this._getOptions();
    
    // Render widget into shadow root
    SummarizeWidget._renderIntoShadow(this._shadowRoot, options);
    
    this._rendered = true;
  }

  // Property getters/setters for programmatic access
  get theme(): string | null {
    return this.getAttribute('theme');
  }

  set theme(value: string | null) {
    if (value) {
      this.setAttribute('theme', value);
    } else {
      this.removeAttribute('theme');
    }
  }

  get mode(): string | null {
    return this.getAttribute('mode');
  }

  set mode(value: string | null) {
    if (value) {
      this.setAttribute('mode', value);
    } else {
      this.removeAttribute('mode');
    }
  }

  get services(): string | null {
    return this.getAttribute('services');
  }

  set services(value: string | null) {
    if (value) {
      this.setAttribute('services', value);
    } else {
      this.removeAttribute('services');
    }
  }
}

