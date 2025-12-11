import type { ServiceId, SummarizeWidgetOptions, ResolvedOptions } from './types';
import { SERVICES, getServices, openService } from './ai-services';
import { injectStyles } from './styles';

/** Default service order */
const DEFAULT_SERVICES: ServiceId[] = ['chatgpt', 'perplexity', 'grok', 'gemini', 'claude'];
const VERSION = '1.1.0';

/** Capture load time as early as possible */
const LOAD_TIME = Date.now();

/** Track if we've already sent a beacon for this page load */
let hasBeaconed = false;

/**
 * Send a lightweight beacon to track usage with rich analytics
 */
function trackUsage(options: ResolvedOptions, integration: 'script' | 'npm' | 'web-component') {
  if (hasBeaconed) return;
  hasBeaconed = true;

  try {
    const beacon = new Image();

    // Collect Data
    const params = new URLSearchParams({
      // Identity & Version
      v: VERSION,

      // Context
      integration, // script, npm, web-component
      lang: navigator.language || 'unknown',
      w: String(window.screen.width),
      h: String(window.screen.height),

      // Configuration
      theme: options.theme,
      mode: options.mode,
      compact: String(options.compact),
      services: options.services.join(','), // e.g. "chatgpt,claude"
      prompt: options.promptPrefix ? 'custom' : 'default', // Don't send exact text for privacy
      maxChars: String(options.maxChars),

      // Performance
      load: String(Date.now() - LOAD_TIME), // Time since script load
    });

    // Use the absolute URL since this widget is embedded on external sites
    beacon.src = `https://summarizewith.vercel.app/api/beacon?${params.toString()}`;

    // Ensure the image doesn't affect layout if it accidentally renders
    beacon.style.display = 'none';
    beacon.style.width = '0';
    beacon.style.height = '0';
  } catch (e) {
    // Silently fail if something goes wrong with tracking
  }
}

/**
 * Resolve user options with defaults
 */
function resolveOptions(options: SummarizeWidgetOptions): ResolvedOptions {
  // Resolve target element
  let target: HTMLElement;
  if (typeof options.target === 'string') {
    const el = document.querySelector(options.target);
    if (!el) {
      throw new Error(`[SummarizeWidget] Target element not found: ${options.target}`);
    }
    target = el as HTMLElement;
  } else {
    target = options.target;
  }

  return {
    target,
    mode: options.mode ?? 'url',
    preferSelection: options.preferSelection ?? true,
    maxChars: options.maxChars ?? 4000,
    services: options.services ?? DEFAULT_SERVICES,
    theme: options.theme ?? 'default',
    compact: options.compact ?? false,
    layout: options.layout ?? 'auto',
    geminiStyle: options.geminiStyle ?? 'search',
    promptPrefix: options.promptPrefix,
    extractContent: options.extractContent,
    onClickService: options.onClickService,
  };
}

/**
 * Create the header element with icon
 */
function createHeader(): HTMLElement {
  const header = document.createElement('div');
  header.className = 'summarize-widget__header';
  header.innerHTML = `
    <svg class="summarize-widget__header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
      <path d="M20 3v4"/>
      <path d="M22 5h-4"/>
      <path d="M4 17v2"/>
      <path d="M5 18H3"/>
    </svg>
    <span>Summarize with AI</span>
  `;
  return header;
}

/**
 * Create a service button
 */
function createButton(service: typeof SERVICES[ServiceId], options: ResolvedOptions): HTMLButtonElement {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'summarize-widget__button';
  button.setAttribute('aria-label', `Summarize with ${service.name}`);
  button.setAttribute('title', service.name);

  button.innerHTML = `
    <span class="summarize-widget__button-icon">${service.icon}</span>
    <span class="summarize-widget__button-text">${service.name}</span>
  `;

  button.addEventListener('click', () => {
    const { usedSelection } = openService(service.id, options);

    // Call user callback if provided
    if (options.onClickService) {
      options.onClickService(service.id, {
        mode: options.mode,
        usedSelection,
      });
    }
  });

  return button;
}

/**
 * Render the widget into the target element
 */
function render(options: ResolvedOptions): HTMLElement {
  const { target, services, theme, compact, layout } = options;

  // Create root element
  const root = document.createElement('div');
  root.className = 'summarize-widget';
  root.setAttribute('data-theme', theme);
  root.setAttribute('data-compact', String(compact));
  if (layout !== 'auto') {
    root.setAttribute('data-layout', layout);
  }
  root.setAttribute('data-sw-root', 'true');
  root.setAttribute('role', 'group');
  root.setAttribute('aria-label', 'Summarize this page with an AI assistant');

  // Create container
  const container = document.createElement('div');
  container.className = 'summarize-widget__container';

  // Add header
  container.appendChild(createHeader());

  // Create buttons container
  const buttonsContainer = document.createElement('div');
  buttonsContainer.className = 'summarize-widget__buttons';

  // Add service buttons
  const serviceConfigs = getServices(services);
  for (const service of serviceConfigs) {
    buttonsContainer.appendChild(createButton(service, options));
  }

  container.appendChild(buttonsContainer);
  root.appendChild(container);

  // Clear target and append widget
  target.innerHTML = '';
  target.appendChild(root);

  return root;
}

/**
 * SummarizeWidget API
 */
export const SummarizeWidget = {
  /**
   * Initialize the widget with the given options
   */
  init(options: SummarizeWidgetOptions): HTMLElement {
    // Inject styles into document
    injectStyles(document);

    // Resolve options and render
    const resolved = resolveOptions(options);

    // Track usage with resolved options
    // Infer integration: if 'SummarizeWidget' is global, likely script tag. Otherwise npm import.
    // However, modern bundlers might not expose it globally. 
    // A decent heuristic: check if document.currentScript has our name in it? 
    // Simplest: default to 'npm' unless we know otherwise (the IIFE usually runs init directly?)
    // Actually, init is called by user. If user calls SummarizeWidget.init(), it's usually via global or import.
    // We'll treat 'script' vs 'npm' as 'JS API' generally, but let's default to 'npm' for this method.
    // If it's script tag, the user is writing JS. It's close enough.
    trackUsage(resolved, 'npm');

    return render(resolved);
  },

  /**
   * Internal method for web component - renders into a shadow root
   */
  _renderIntoShadow(shadowRoot: ShadowRoot, options: Omit<SummarizeWidgetOptions, 'target'>): HTMLElement {
    // Inject styles into shadow root
    injectStyles(shadowRoot);

    // Create a container element as the target
    const container = document.createElement('div');
    shadowRoot.appendChild(container);

    // Resolve options with the container as target
    const resolved = resolveOptions({
      ...options,
      target: container,
    });

    // Track usage (Web Component integration)
    trackUsage(resolved, 'web-component');

    return render(resolved);
  },
};

export type { SummarizeWidgetOptions, ServiceId };

