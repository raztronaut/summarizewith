/**
 * CSS styles for the Summarize Widget
 * Uses CSS custom properties for easy theming
 */
export const WIDGET_STYLES = `
.summarize-widget {
  /* Base variables - can be overridden by host */
  --sw-bg: #ffffff;
  --sw-border: #e5e7eb;
  --sw-border-radius: 10px;
  --sw-padding: 1rem;
  --sw-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  --sw-font-size: 13px;
  --sw-text-color: #374151;
  --sw-text-secondary: #6b7280;
  --sw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  
  /* Button variables */
  --sw-button-bg: #f9fafb;
  --sw-button-hover: #f3f4f6;
  --sw-button-active: #e5e7eb;
  --sw-button-border: #e5e7eb;
  --sw-button-radius: 8px;
  --sw-button-padding: 0.5rem 0.875rem;
  --sw-button-gap: 0.5rem;
  
  /* Focus ring */
  --sw-focus-ring: #3b82f6;
  --sw-focus-ring-offset: 2px;
  
  /* Layout */
  display: inline-block;
  font-family: var(--sw-font-family);
  font-size: var(--sw-font-size);
  color: var(--sw-text-color);
  box-sizing: border-box;
  line-height: 1.5;
}

.summarize-widget *,
.summarize-widget *::before,
.summarize-widget *::after {
  box-sizing: border-box;
}

.summarize-widget__container {
  background: var(--sw-bg);
  border: 1px solid var(--sw-border);
  border-radius: var(--sw-border-radius);
  padding: var(--sw-padding);
  box-shadow: var(--sw-shadow);
}

.summarize-widget__header {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  margin-bottom: 0.75rem;
  color: var(--sw-text-secondary);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.02em;
}

.summarize-widget__header-icon {
  width: 14px;
  height: 14px;
  opacity: 0.7;
}

.summarize-widget__buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
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
  transition: background-color 0.15s ease, border-color 0.15s ease, transform 0.1s ease;
  text-decoration: none;
  line-height: 1;
  white-space: nowrap;
}

.summarize-widget__button:hover {
  background: var(--sw-button-hover);
  border-color: #d1d5db;
}

.summarize-widget__button:active {
  background: var(--sw-button-active);
  transform: scale(0.98);
}

.summarize-widget__button:focus-visible {
  outline: 2px solid var(--sw-focus-ring);
  outline-offset: var(--sw-focus-ring-offset);
}

.summarize-widget__button-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.summarize-widget__button-icon svg {
  width: 100%;
  height: 100%;
}

.summarize-widget__button-text {
  line-height: 1;
}

/* ============================================
   DARK THEME
   ============================================ */
.summarize-widget[data-theme="dark"] {
  --sw-bg: #1f2937;
  --sw-border: #374151;
  --sw-text-color: #f9fafb;
  --sw-text-secondary: #9ca3af;
  --sw-button-bg: #374151;
  --sw-button-hover: #4b5563;
  --sw-button-active: #6b7280;
  --sw-button-border: #4b5563;
  --sw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.3);
}

/* ============================================
   MINIMAL THEME
   ============================================ */
.summarize-widget[data-theme="minimal"] {
  --sw-bg: transparent;
  --sw-border: transparent;
  --sw-shadow: none;
  --sw-padding: 0;
  --sw-button-bg: transparent;
  --sw-button-hover: rgba(0, 0, 0, 0.06);
  --sw-button-active: rgba(0, 0, 0, 0.1);
  --sw-button-border: transparent;
}

.summarize-widget[data-theme="minimal"] .summarize-widget__container {
  border: none;
  box-shadow: none;
}

.summarize-widget[data-theme="minimal"] .summarize-widget__header {
  display: none;
}

/* ============================================
   COMPACT MODE (Icons Only)
   ============================================ */
.summarize-widget[data-compact="true"] .summarize-widget__header {
  display: none;
}

.summarize-widget[data-compact="true"] .summarize-widget__container {
  padding: 0.5rem;
}

.summarize-widget[data-compact="true"] .summarize-widget__buttons {
  gap: 0.375rem;
}

.summarize-widget[data-compact="true"] .summarize-widget__button {
  padding: 0.5rem;
}

.summarize-widget[data-compact="true"] .summarize-widget__button-icon {
  width: 18px;
  height: 18px;
}

.summarize-widget[data-compact="true"] .summarize-widget__button-text {
  display: none;
}

/* ============================================
   COMPACT + MINIMAL
   ============================================ */
.summarize-widget[data-theme="minimal"][data-compact="true"] .summarize-widget__container {
  padding: 0;
}

.summarize-widget[data-theme="minimal"][data-compact="true"] .summarize-widget__buttons {
  gap: 0.25rem;
}

/* ============================================
   COMPACT + DARK
   ============================================ */
.summarize-widget[data-theme="dark"][data-compact="true"] .summarize-widget__button {
  border-color: var(--sw-button-border);
}

/* ============================================
   RESPONSIVE / MOBILE
   ============================================ */
@media (max-width: 480px) {
  .summarize-widget:not([data-compact="true"]) .summarize-widget__buttons {
    flex-direction: column;
  }
  
  .summarize-widget:not([data-compact="true"]) .summarize-widget__button {
    width: 100%;
  }
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
