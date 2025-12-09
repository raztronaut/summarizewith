---
name: Summarize With AI Widget
overview: Create a lightweight, embeddable "Summarize with AI" widget that allows users to send page content to various AI services. Distributed as an embeddable script, Web Component, and npm package with light/dark/minimal themes.
todos:
  - id: setup
    content: Initialize project with package.json, tsconfig, and esbuild config
    status: completed
  - id: ai-services
    content: Implement AI Services Logic (map, URL builders, selection detection, truncation, custom prompt prefixes)
    status: completed
    dependencies:
      - setup
  - id: styles
    content: Implement Styles and Themes (CSS variables, data-theme)
    status: completed
    dependencies:
      - setup
  - id: core-widget
    content: Implement Core Widget (DOM rendering, a11y, event handling, init method)
    status: completed
    dependencies:
      - ai-services
      - styles
  - id: web-component
    content: Implement Web Component Wrapper (Shadow DOM, attribute observation)
    status: completed
    dependencies:
      - core-widget
  - id: entry
    content: Create Entry Point (index.ts) with SSR guards and export logic
    status: completed
    dependencies:
      - web-component
  - id: build-scripts
    content: Configure Build Scripts (esbuild for IIFE/ESM/types)
    status: completed
    dependencies:
      - entry
  - id: demo
    content: Create Demo Page (index.html with examples for different modes and services)
    status: completed
    dependencies:
      - build-scripts
---

# Summarize With AI Widget

## Architecture

Create a vanilla JavaScript/TypeScript widget with zero dependencies.

- **Entry Point:** `src/index.ts` - Exports `SummarizeWidget` and conditionally defines `<summarize-with-ai>`.
- **Separation:**
  - `src/summarize-widget.ts`: Core logic and DOM rendering (Light DOM friendly).
  - `src/web-component.ts`: Web Component wrapper (Shadow DOM friendly).
  - `src/ai-services.ts`: Data-driven service map, URL building, truncation.
  - `src/styles.ts`: CSS with CSS variables and themes.
- **Safety:** Guard against double-registration and SSR environments.

## Core Features

1.  **AI Services Strategy**

    - **Services:** ChatGPT (`chat.openai.com` / `chatgpt.com`), Claude (`claude.ai`), Perplexity (`perplexity.ai/search/new`), Grok (`x.com/i/grok`), Gemini (App `gemini.google.com/app` or Search `google.com/search?udm=50`).
    - **Selection-First:** If text is selected, summarize that. Else, use full page content or URL.
    - **Prompts:** "Summarize this page: {url}" or custom prompts like "As a {persona}, summarize...".
    - **Safety:** URL encoding, character limits (default 4k chars), `noopener,noreferrer`.

2.  **Content Extraction**

    - Default: `document.body.innerText` + basic cleanup (ignores the widget itself).
    - Configurable: `options.extractContent` function for custom logic.

3.  **Styling & Themes**

    - **Variables:** Extensive use of `--sw-*` vars (bg, radius, gap, font-size).
    - **Themes:** `data-theme="light|dark|minimal"` attribute.
    - **Isolation:** Shadow DOM for the Web Component.

4.  **Accessibility (A11y)**

    - Semantic `<button>` elements.
    - `aria-label` on container and buttons.
    - Keyboard navigable (Tab/Enter).

## API Design

**Common Options Interface:**

```typescript
type ServiceId = 'chatgpt' | 'claude' | 'perplexity' | 'gemini' | 'grok';

interface SummarizeWidgetOptions {
  target: string | HTMLElement;
  mode?: 'url' | 'content';
  preferSelection?: boolean;
  maxChars?: number;
  services?: ServiceId[];
  theme?: 'light' | 'dark' | 'minimal';
  promptPrefix?: string; // e.g. "As a health conscious individual..."
  geminiStyle?: 'app' | 'search'; // Specific config for Gemini
  extractContent?: () => string;
  onClickService?: (serviceId: ServiceId, context: { mode: 'url' | 'content'; usedSelection: boolean }) => void;
}
```

## Build Artifacts

- `dist/summarize-widget.iife.js` (Global `window.SummarizeWidget`)
- `dist/summarize-widget.esm.js` (ES Module import)
- `dist/types.d.ts` (TypeScript declarations)

## Implementation Steps