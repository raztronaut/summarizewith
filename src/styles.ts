/**
 * CSS styles for the Summarize Widget
 * Uses CSS custom properties for easy theming
 */
export const WIDGET_STYLES = `
.summarize-widget {
  /* =========================================
     DEFAULT THEME VARIABLES (Glass / Liquid)
     ========================================= */
  
  /* Background: Adaptive translucent liquid glass */
  /* Fallback for browsers without backdrop-filter */
  --sw-bg: rgba(255, 255, 255, 0.95);
  
  /* Borders & Shadows */
  --sw-border: rgba(255, 255, 255, 0.2);
  --sw-border-radius: 12px;
  --sw-shadow: 
    0 8px 32px 0 rgba(31, 38, 135, 0.15),
    inset 0 0 0 1px rgba(255, 255, 255, 0.2);

  /* Typography: Inherit for adaptive contrast */
  --sw-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  --sw-font-size: 13px;
  --sw-text-color: inherit;
  --sw-text-secondary: inherit;
  
  /* Button Variables */
  --sw-button-bg: rgba(255, 255, 255, 0.2);
  --sw-button-hover: rgba(255, 255, 255, 0.4);
  --sw-button-active: rgba(255, 255, 255, 0.5);
  --sw-button-border: rgba(255, 255, 255, 0.1);
  --sw-button-radius: 8px;
  --sw-button-padding: 0.5rem 0.875rem;
  --sw-button-gap: 0.5rem;
  
  /* Focus Ring */
  --sw-focus-ring: rgba(59, 130, 246, 0.5);
  --sw-focus-ring-offset: 2px;
  
  /* Layout */
  --sw-padding: 1rem;
  display: inline-block;
  font-family: var(--sw-font-family);
  font-size: var(--sw-font-size);
  color: var(--sw-text-color);
  box-sizing: border-box;
  line-height: 1.5;
}

/* ============================================
   ADVANCED GLASS SUPPORT
   ============================================ */
@supports (backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)) {
  /* Apply glass effect globally as the default - overrides handle strict themes */
  .summarize-widget {
    --sw-bg: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%), rgba(255, 255, 255, 0.1);
  }
  
  .summarize-widget .summarize-widget__container {
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
  }
  
  .summarize-widget .summarize-widget__button {
     backdrop-filter: blur(4px);
     -webkit-backdrop-filter: blur(4px);
  }
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
  opacity: 0.8; /* Slight transparency for hierarchy in adaptive mode */
}

/* Override opacity for themes that set explicit secondary colors */
.summarize-widget[data-theme="light"] .summarize-widget__header,
.summarize-widget[data-theme="dark"] .summarize-widget__header {
  opacity: 1;
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
  border-color: rgba(255,255,255, 0.4);
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
   LIGHT THEME OVERRIDE
   ============================================ */
.summarize-widget[data-theme="light"] {
  --sw-bg: #ffffff;
  --sw-border: #e5e7eb;
  --sw-text-color: #374151;
  --sw-text-secondary: #6b7280;
  --sw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  
  --sw-button-bg: #f9fafb;
  --sw-button-hover: #f3f4f6;
  --sw-button-active: #e5e7eb;
  --sw-button-border: #e5e7eb;
  
  --sw-focus-ring: #3b82f6;
}

.summarize-widget[data-theme="light"] .summarize-widget__container,
.summarize-widget[data-theme="light"] .summarize-widget__button {
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

/* ============================================
   DARK THEME OVERRIDE
   ============================================ */
.summarize-widget[data-theme="dark"] {
  --sw-bg: #1f2937;
  --sw-border: #374151;
  --sw-text-color: #f9fafb;
  --sw-text-secondary: #9ca3af;
  --sw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.3);
  
  --sw-button-bg: #374151;
  --sw-button-hover: #4b5563;
  --sw-button-active: #6b7280;
  --sw-button-border: #4b5563;
}

.summarize-widget[data-theme="dark"] .summarize-widget__container,
.summarize-widget[data-theme="dark"] .summarize-widget__button {
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

/* ============================================
   MINIMAL THEME OVERRIDE
   ============================================ */
.summarize-widget[data-theme="minimal"] {
  --sw-text-color: inherit;
  --sw-text-secondary: inherit;
  
  --sw-bg: transparent;
  --sw-border: transparent;
  --sw-shadow: none;
  --sw-padding: 0;
  
  --sw-button-bg: transparent;
  --sw-button-border: transparent;
  
  /* Modern browsers: Context-aware mix */
  --sw-button-hover: rgba(128, 128, 128, 0.1); 
  --sw-button-active: rgba(128, 128, 128, 0.2);

  @supports (background: color-mix(in srgb, red, blue)) {
    --sw-button-hover: color-mix(in srgb, currentColor, transparent 92%);
    --sw-button-active: color-mix(in srgb, currentColor, transparent 85%);
  }
}

.summarize-widget[data-theme="minimal"] .summarize-widget__container {
  border: none;
  box-shadow: none;
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

/* Compact + Minimal */
.summarize-widget[data-theme="minimal"][data-compact="true"] .summarize-widget__container {
  padding: 0;
}

.summarize-widget[data-theme="minimal"][data-compact="true"] .summarize-widget__buttons {
  gap: 0.25rem;
}

/* Compact + Dark/Light Button Borders */
.summarize-widget[data-theme="dark"][data-compact="true"] .summarize-widget__button,
.summarize-widget[data-theme="light"][data-compact="true"] .summarize-widget__button {
  border-color: var(--sw-button-border);
}

/* Responsive */
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
export function injectStyles(target: Node) {
  const style = document.createElement('style');
  style.textContent = WIDGET_STYLES;
  if (target instanceof Document) {
    target.head.appendChild(style);
  } else {
    target.appendChild(style);
  }
}