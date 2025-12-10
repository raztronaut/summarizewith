/**
 * Available AI service identifiers
 */
export type ServiceId = 'chatgpt' | 'claude' | 'perplexity' | 'gemini' | 'grok';

/**
 * Configuration for an AI service
 */
export interface ServiceConfig {
  id: ServiceId;
  name: string;
  icon: string;
  buildUrl: (prompt: string, options?: { geminiStyle?: 'app' | 'search' }) => string;
}

/**
 * Context passed to the onClickService callback
 */
export interface ClickContext {
  mode: 'url' | 'content';
  usedSelection: boolean;
}

/**
 * Options for initializing the SummarizeWidget
 */
export interface SummarizeWidgetOptions {
  /** Target element or selector to render the widget into */
  target: string | HTMLElement;
  /** Mode for generating prompts: 'url' sends page URL, 'content' sends page text */
  mode?: 'url' | 'content';
  /** If true, use selected text when available (default: true) */
  preferSelection?: boolean;
  /** Maximum characters for content mode (default: 4000) */
  maxChars?: number;
  /** Which AI services to show (default: all) */
  services?: ServiceId[];
  /** Visual theme (default: 'light') */
  theme?: 'default' | 'light' | 'dark' | 'minimal' | 'glass';
  /** If true, show only icons without text labels (default: false) */
  compact?: boolean;
  /** Custom prompt prefix, e.g. "As a health conscious individual..." */
  promptPrefix?: string;
  /** Gemini URL style: 'app' for gemini.google.com, 'search' for google.com/search with AI */
  geminiStyle?: 'app' | 'search';
  /** Custom content extraction function */
  extractContent?: () => string;
  /** Callback when a service button is clicked */
  onClickService?: (serviceId: ServiceId, context: ClickContext) => void;
}

/**
 * Internal resolved options with defaults applied
 */
export interface ResolvedOptions extends Required<Omit<SummarizeWidgetOptions, 'target' | 'extractContent' | 'onClickService' | 'promptPrefix' | 'compact'>> {
  target: HTMLElement;
  compact: boolean;
  extractContent?: () => string;
  onClickService?: (serviceId: ServiceId, context: ClickContext) => void;
  promptPrefix?: string;
}

