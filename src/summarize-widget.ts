import type { ServiceId, SummarizeWidgetOptions, ResolvedOptions } from './types';
import { SERVICES, getServices, openService } from './ai-services';
import { injectStyles } from './styles';

/** Default service order */
const DEFAULT_SERVICES: ServiceId[] = ['chatgpt', 'perplexity', 'grok', 'gemini', 'claude'];

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
    theme: options.theme ?? 'light',
    compact: options.compact ?? false,
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
  const { target, services, theme, compact } = options;
  
  // Create root element
  const root = document.createElement('div');
  root.className = 'summarize-widget';
  root.setAttribute('data-theme', theme);
  root.setAttribute('data-compact', String(compact));
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
    
    return render(resolved);
  },
};

export type { SummarizeWidgetOptions, ServiceId };

