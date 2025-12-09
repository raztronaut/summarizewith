import type { ServiceId, ServiceConfig, ResolvedOptions } from './types';
import chatgptIcon from './assets/icons/chatgpt.svg';
import claudeIcon from './assets/icons/claude.svg';
import perplexityIcon from './assets/icons/perplexity.svg';
import geminiIcon from './assets/icons/gemini.svg';
import grokIcon from './assets/icons/grok.svg';

/**
 * Default AI service configurations with verified URL patterns
 */
export const SERVICES: Record<ServiceId, ServiceConfig> = {
  chatgpt: {
    id: 'chatgpt',
    name: 'ChatGPT',
    icon: chatgptIcon,
    buildUrl: (prompt) => `https://chat.openai.com/?q=${encodeURIComponent(prompt)}`
  },
  claude: {
    id: 'claude',
    name: 'Claude',
    icon: claudeIcon,
    buildUrl: (prompt) => `https://claude.ai/new?q=${encodeURIComponent(prompt)}`
  },
  perplexity: {
    id: 'perplexity',
    name: 'Perplexity',
    icon: perplexityIcon,
    buildUrl: (prompt) => `https://www.perplexity.ai/search/new?q=${encodeURIComponent(prompt)}`
  },
  gemini: {
    id: 'gemini',
    name: 'Gemini',
    icon: geminiIcon,
    buildUrl: (prompt, options) => {
      if (options?.geminiStyle === 'search') {
        return `https://www.google.com/search?q=${encodeURIComponent(prompt)}&udm=50`;
      }
      return `https://gemini.google.com/app?q=${encodeURIComponent(prompt)}`;
    }
  },
  grok: {
    id: 'grok',
    name: 'Grok',
    icon: grokIcon,
    buildUrl: (prompt) => `https://x.com/i/grok?text=${encodeURIComponent(prompt)}`
  }
};

/**
 * Get an ordered list of service configs based on provided service IDs
 */
export function getServices(serviceIds: ServiceId[]): ServiceConfig[] {
  return serviceIds.map(id => SERVICES[id]).filter(Boolean);
}

/**
 * Get selected text from the document, if any
 */
export function getSelectedText(): string {
  const selection = window.getSelection();
  return selection?.toString().trim() || '';
}

/**
 * Get page content, excluding the widget itself
 */
export function getPageContent(): string {
  // Clone body to avoid modifying the actual DOM
  const clone = document.body.cloneNode(true) as HTMLElement;
  
  // Remove widget elements
  const widgets = clone.querySelectorAll('[data-sw-root]');
  widgets.forEach(el => el.remove());
  
  // Get text and clean up whitespace
  let text = clone.innerText || '';
  text = text.replace(/\s+/g, ' ').trim();
  
  return text;
}

/**
 * Truncate text to a maximum length, trying to break at word boundaries
 */
export function truncateText(text: string, maxChars: number): string {
  if (text.length <= maxChars) return text;
  
  // Try to break at a word boundary
  const truncated = text.substring(0, maxChars);
  const lastSpace = truncated.lastIndexOf(' ');
  
  if (lastSpace > maxChars * 0.8) {
    return truncated.substring(0, lastSpace) + '...';
  }
  
  return truncated + '...';
}

/**
 * Build the prompt based on options and current page state
 */
export function buildPrompt(options: ResolvedOptions): { prompt: string; usedSelection: boolean } {
  const url = window.location.href;
  let usedSelection = false;
  let content: string;
  
  // Check for selection first if preferred
  if (options.preferSelection) {
    const selection = getSelectedText();
    if (selection) {
      content = selection;
      usedSelection = true;
    }
  }
  
  // If no selection (or not preferred), use mode-based content
  if (!usedSelection) {
    if (options.mode === 'content') {
      // Use custom extractor if provided, otherwise default
      content = options.extractContent 
        ? options.extractContent()
        : getPageContent();
      content = truncateText(content, options.maxChars);
    } else {
      content = url;
    }
  } else {
    // Truncate selection if needed
    content = truncateText(content!, options.maxChars);
  }
  
  // Build the prompt
  let prompt: string;
  
  if (options.promptPrefix) {
    // Custom prefix provided
    if (options.mode === 'url' && !usedSelection) {
      prompt = `${options.promptPrefix} ${url}`;
    } else {
      prompt = `${options.promptPrefix}\n\n${content}`;
    }
  } else {
    // Default prompts
    if (options.mode === 'url' && !usedSelection) {
      prompt = `Summarize this page: ${url}`;
    } else if (usedSelection) {
      prompt = `Summarize this selection from ${url}:\n\n${content}`;
    } else {
      prompt = `Summarize the following content from ${url}:\n\n${content}`;
    }
  }
  
  return { prompt, usedSelection };
}

/**
 * Open an AI service with the given prompt
 */
export function openService(
  serviceId: ServiceId,
  options: ResolvedOptions
): { usedSelection: boolean } {
  const service = SERVICES[serviceId];
  if (!service) {
    console.warn(`[SummarizeWidget] Unknown service: ${serviceId}`);
    return { usedSelection: false };
  }
  
  const { prompt, usedSelection } = buildPrompt(options);
  const url = service.buildUrl(prompt, { geminiStyle: options.geminiStyle });
  
  // Open in new tab with security attributes
  window.open(url, '_blank', 'noopener,noreferrer');
  
  return { usedSelection };
}

