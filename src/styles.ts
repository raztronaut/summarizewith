
/**
 * CSS styles for the Summarize Widget
 * Uses CSS custom properties for easy theming
 */
export const WIDGET_STYLES = `
.summarize-widget {
  /* Base variables - can be overridden by host */
  --sw-bg: #ffffff;
  --sw-border: #e2e8f0;
  --sw-border-radius: 12px;
  --sw-gap: 0.75rem;
  --sw-padding: 1.25rem;
  --sw-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  --sw-font-size: 14px;
  --sw-text-color: #334155;
  --sw-text-secondary: #64748b;
  --sw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  
  /* Button variables */
  --sw-button-bg: #ffffff;
  --sw-button-hover: #f8fafc;
  --sw-button-active: #f1f5f9;
  --sw-button-border: #e2e8f0;
  --sw-button-radius: 8px;
  --sw-button-padding: 0.5rem 0.75rem;
  --sw-button-gap: 0.5rem;
  --sw-button-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  
  /* Focus ring */
  --sw-focus-ring: #3b82f6;
  --sw-focus-ring-offset: 2px;
  
  /* Layout */
  display: block;
  font-family: var(--sw-font-family);
  font-size: var(--sw-font-size);
  color: var(--sw-text-color);
  box-sizing: border-box;
  width: 100%;
}

.summarize-widget * {
  box-sizing: border-box;
}

.summarize-widget__container {
  background: var(--sw-bg);
  border: 1px solid var(--sw-border);
  border-radius: var(--sw-border-radius);
  padding: var(--sw-padding);
  box-shadow: var(--sw-shadow);
  width: 100%;
}

.summarize-widget__header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  color: var(--sw-text-secondary);
  font-size: 0.875em;
  font-weight: 600;
  letter-spacing: 0.025em;
  text-transform: uppercase;
}

.summarize-widget__header-icon {
  width: 16px;
  height: 16px;
  color: var(--sw-text-color);
}

.summarize-widget__buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.75rem;
  align-items: center;
}

.summarize-widget__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--sw-button-gap);
  padding: var(--sw-button-padding);
  background: var(--sw-button-bg);
  border: 1px solid var(--sw-button-border);
  border-radius: var(--sw-button-radius);
  color: var(--sw-text-color);
  font-family: inherit;
  font-size: inherit;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  line-height: 1.25;
  box-shadow: var(--sw-button-shadow);
  white-space: nowrap;
}

.summarize-widget__button:hover {
  background: var(--sw-button-hover);
  border-color: #cbd5e1;
}

.summarize-widget__button:active {
  background: var(--sw-button-active);
  box-shadow: none;
}

.summarize-widget__button:focus-visible {
  outline: 2px solid var(--sw-focus-ring);
  outline-offset: var(--sw-focus-ring-offset);
}

.summarize-widget__button-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.summarize-widget__button-icon svg {
  width: 100%;
  height: 100%;
}

/* Dark theme */
.summarize-widget[data-theme="dark"] {
  --sw-bg: #1e293b;
  --sw-border: #334155;
  --sw-text-color: #f1f5f9;
  --sw-text-secondary: #94a3b8;
  --sw-button-bg: #1e293b;
  --sw-button-hover: #334155;
  --sw-button-active: #1e293b;
  --sw-button-border: #475569;
  --sw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.25);
  --sw-button-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.25);
}

/* Minimal theme */
.summarize-widget[data-theme="minimal"] {
  --sw-bg: transparent;
  --sw-border: transparent;
  --sw-padding: 0;
  --sw-button-bg: transparent;
  --sw-button-hover: rgba(0, 0, 0, 0.05);
  --sw-button-active: rgba(0, 0, 0, 0.1);
  --sw-button-border: transparent;
  --sw-shadow: none;
  --sw-button-shadow: none;
}

.summarize-widget[data-theme="minimal"] .summarize-widget__container {
  border: none;
  box-shadow: none;
  padding: 0;
}

.summarize-widget[data-theme="minimal"] .summarize-widget__header {
  display: none;
}

.summarize-widget[data-theme="minimal"] .summarize-widget__button {
  background: var(--sw-button-bg);
  border: 1px solid var(--sw-border);
  box-shadow: none;
}
.summarize-widget[data-theme="minimal"] .summarize-widget__button:hover {
  background: var(--sw-button-hover);
  transform: none;
}

/* Compact mode - icons only */
.summarize-widget[data-compact="true"] .summarize-widget__header {
  display: none;
}

.summarize-widget[data-compact="true"] .summarize-widget__container {
  padding: 0.75rem;
}

.summarize-widget[data-compact="true"] .summarize-widget__buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.summarize-widget[data-compact="true"] .summarize-widget__button {
  padding: 0.625rem;
  min-width: auto;
}

.summarize-widget[data-compact="true"] .summarize-widget__button-icon {
  width: 20px;
  height: 20px;
}

.summarize-widget[data-compact="true"] .summarize-widget__button-text {
  display: none;
}

/* Compact + minimal combined */
.summarize-widget[data-theme="minimal"][data-compact="true"] .summarize-widget__container {
  padding: 0;
}

/* Responsive adjustments */
/* Use container query logic via flex-wrap */
.summarize-widget__buttons {
  flex-wrap: wrap;
}
`;

/**
 * Inject styles into a target (document head or shadow root)
 */
export function injectStyles(target: Document | ShadowRoot): void {
  const styleId = 'summarize-widget-styles';
  
  // For document, check if already injected
  if (target instanceof Document) {
    if (target.getElementById(styleId)) return;
    
    const style = target.createElement('style');
    style.id = styleId;
    style.textContent = WIDGET_STYLES;
    target.head.appendChild(style);
  } else {
    // For shadow root
    const style = document.createElement('style');
    style.textContent = WIDGET_STYLES;
    target.appendChild(style);
  }
}
