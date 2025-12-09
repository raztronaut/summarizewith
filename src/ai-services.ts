import type { ServiceId, ServiceConfig, ResolvedOptions } from './types';

/**
 * Default AI service configurations with verified URL patterns
 */
export const SERVICES: Record<ServiceId, ServiceConfig> = {
  chatgpt: {
    id: 'chatgpt',
    name: 'ChatGPT',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.8956zm16.0993 3.8558L12.6 8.3829l2.02-1.1638a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.1408 1.6465 4.4708 4.4708 0 0 1 .5765 3.0166zm-12.641 4.1358-2.0201-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.5046-2.6067-1.4998z"/></svg>`,
    buildUrl: (prompt) => `https://chat.openai.com/?q=${encodeURIComponent(prompt)}`
  },
  claude: {
    id: 'claude',
    name: 'Claude',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.16-2.136-.14-.815-.063.054-.236.594-.166.463-.124 2.156-.45 2.156-.404 1.145-.198-.56-.166-1.383-.534-2.136-.87-1.976-.864-.603-.294.138-.206.732.03.99.117 2.136.334 2.195.397.716.138-.22-.152-.93-.75-1.563-1.348-1.447-1.32-.44-.436.196-.15.75.27.872.393 1.563.79 1.976 1.068 1.07.612.63.366-.366-.27-.752-.652-1.306-1.32-1.328-1.46-.625-.76.25-.108.788.403.93.522 1.523 1.003 1.383 1.035.81.686.462.436-.134-.436-.49-.936-.79-1.788-.493-1.312-.147-.472.288-.054.603.42.872.722 1.088 1.052 1.01 1.136.384.507.26.414-.168-.306-.364-1.08-.295-1.026-.147-.638.32.04.542.404.534.45.404.424.403.498.298.42h.227l.09-.26-.265-1.214-.205-1.392-.063-.562.342.108.345.56.446.888.477 1.07.283.752.138.455h.198l.058-.278-.017-.81.05-1.23.148-1.036.128-.438.336.186.2.622.224.937.183 1.035.07.65-.006.37h.18l.123-.432.234-.924.34-1.014.24-.538.27.072.182.454.25.84.323 1.108.162.687v.267l.14-.037.326-.728.462-1.08.407-.86.168.026.133.546.134 1.216.065.802-.005.33.172-.12.38-.586.517-.89.46-.758.137-.04.07.382-.01.954-.087 1.33-.067.61.152-.147.296-.365.663-.872.514-.728.172-.11.127.26.132.774.022.96-.043.6.123-.132.42-.566.462-.656.557-.842.227-.11.232.23.264.747.163.728.026.322.182-.037.33-.363.615-.728.59-.752.056.142.108.58-.053.903-.096.534.21-.14.368-.35.51-.533.717-.84.15.124.108.424-.01.836-.206 1.17.186-.075.403-.32.477-.402.49-.444.302.134.142.326.06.605-.12.908-.132.554.225-.13.324-.227.506-.374.577-.46.225.19.163.44.114.667-.023.706.237-.21.345-.314.396-.374.15.12.22.53.073.608.01.39.28-.256.282-.28.18.212.155.6.043.462-.038.26.284-.32.13.236.086.44-.036.446-.076.286.233-.306.065.394-.037.495-.075.226.193-.218.097.293-.016.392-.108.298.175-.194.15.15.04.292-.15.442-.08.138.178-.17.244.074.116.244-.133.35-.254.438.093-.052.245-.017.32-.156.442.123-.06.282-.114.378-.05.164.133-.068.234-.097.322-.086.19.127-.082.244-.108.31.173-.104.227-.075.288.17-.066.186-.05.22.193-.02.19.016.224-.115.332.16-.062.128-.004.222.128-.05.2.096.158-.13.276.11-.023.22.082.14-.072.208.132-.014.184-.09.25.122-.032.15-.02.19.14-.018.16.064.108-.043.172.11-.006.14-.036.158.094.056.15-.046.134.14-.02.1-.072.142.13.01.118-.05.106.116.06.116-.03.09.15.034.112.016.088.118.074.098-.006.07.152.088.098-.028.11.132.148.064-.01.15.116.184.022.024.206.09.154-.01.15.096.13-.014.106.09.108-.025.08.1.072-.042.054.124.068-.058.044.14.052-.037.048.116.04.078-.028.024.136.034-.05.064.074-.02.114.022-.008.1-.025.058.062.086-.044.088-.07.074.054.07-.052.052.058.054-.052.046.044.044-.026.034.052.032-.028.024.04.034-.03.028.034.012-.006.02.023.022-.016.018.016.012-.006.01.01.018-.01.008.004.016-.008.006.008.008-.004.004z"/></svg>`,
    buildUrl: (prompt) => `https://claude.ai/new?q=${encodeURIComponent(prompt)}`
  },
  perplexity: {
    id: 'perplexity',
    name: 'Perplexity',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 1.5L3 7.5v9l9 6 9-6v-9L12 1.5zm0 2.12l6.6 4.38-6.6 4.4-6.6-4.4 6.6-4.38zM4.5 8.88l6.75 4.5v7.74L4.5 16.5V8.88zm15 0v7.62l-6.75 4.62v-7.74l6.75-4.5z"/></svg>`,
    buildUrl: (prompt) => `https://www.perplexity.ai/search/new?q=${encodeURIComponent(prompt)}`
  },
  gemini: {
    id: 'gemini',
    name: 'Gemini',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 0C5.352 0 0 5.352 0 12s5.352 12 12 12 12-5.352 12-12S18.648 0 12 0zm0 21.6c-5.28 0-9.6-4.32-9.6-9.6S6.72 2.4 12 2.4s9.6 4.32 9.6 9.6-4.32 9.6-9.6 9.6zm4.8-14.4L12 12l4.8 4.8-1.2 1.2L10.8 12l4.8-4.8 1.2 1.2z"/></svg>`,
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
    icon: `<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
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

