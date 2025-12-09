# Summarize With AI

A lightweight, zero-dependency widget to summarize web pages with AI services like ChatGPT, Claude, Perplexity, Gemini, and Grok.

[![ChatGPT Summary](https://img.shields.io/badge/Summarize_with-ChatGPT-10a37f?logo=openai&logoColor=white)](https://chat.openai.com/?q=Summarize%20this%20GitHub%20repository%3A%20https%3A%2F%2Fgithub.com%2Fraztronaut%2Fsummarizewith)
[![Claude Summary](https://img.shields.io/badge/Summarize_with-Claude-d97757?logo=anthropic&logoColor=white)](https://claude.ai/new?q=Summarize%20this%20GitHub%20repository%3A%20https%3A%2F%2Fgithub.com%2Fraztronaut%2Fsummarizewith)
[![Perplexity Summary](https://img.shields.io/badge/Summarize_with-Perplexity-22bfa0?logo=perplexity&logoColor=white)](https://www.perplexity.ai/search/new?q=Summarize%20this%20GitHub%20repository%3A%20https%3A%2F%2Fgithub.com%2Fraztronaut%2Fsummarizewith)
[![Gemini Summary](https://img.shields.io/badge/Summarize_with-Gemini-8E75B2?logo=googlegemini&logoColor=white)](https://gemini.google.com/app?q=Summarize%20this%20GitHub%20repository%3A%20https%3A%2F%2Fgithub.com%2Fraztronaut%2Fsummarizewith)
[![Grok Summary](https://img.shields.io/badge/Summarize_with-Grok-000000?logo=x&logoColor=white)](https://x.com/i/grok?text=Summarize%20this%20GitHub%20repository%3A%20https%3A%2F%2Fgithub.com%2Fraztronaut%2Fsummarizewith)

## Features

- **Zero dependencies** - Pure vanilla JavaScript/TypeScript
- **Multiple distribution formats** - Script tag, Web Component, or npm package
- **5 AI services** - ChatGPT, Claude, Perplexity, Gemini, Grok
- **3 themes** - Light, Dark, Minimal
- **Compact mode** - Icons-only display for tight spaces
- **Smart content handling** - URL mode, content mode, selection-first
- **Fully accessible** - Semantic HTML, ARIA labels, keyboard navigation
- **Customizable** - CSS variables, custom prompts, service selection

## Installation

### Script Tag (CDN)

```html
<div id="summarize-widget"></div>
<script src="https://unpkg.com/summarize-with-ai/dist/summarize-widget.iife.js"></script>
<script>
  SummarizeWidget.init({
    target: '#summarize-widget',
    theme: 'light'
  });
</script>
```

### Web Component

```html
<script src="https://unpkg.com/summarize-with-ai/dist/summarize-widget.iife.js"></script>
<summarize-with-ai theme="dark" mode="url"></summarize-with-ai>
```

### npm

```bash
npm install summarize-with-ai
```

```js
import { SummarizeWidget } from 'summarize-with-ai';

SummarizeWidget.init({
  target: '#widget',
  theme: 'minimal'
});
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `target` | `string \| HTMLElement` | Required | CSS selector or element to render into |
| `theme` | `'light' \| 'dark' \| 'minimal'` | `'light'` | Visual theme |
| `compact` | `boolean` | `false` | Show icons only (no text labels) |
| `mode` | `'url' \| 'content'` | `'url'` | Send page URL or extracted content |
| `services` | `ServiceId[]` | All services | Which AI services to show |
| `preferSelection` | `boolean` | `true` | Use selected text if available |
| `maxChars` | `number` | `4000` | Max characters for content mode |
| `promptPrefix` | `string` | - | Custom prompt prefix |
| `geminiStyle` | `'app' \| 'search'` | `'app'` | Gemini URL style |
| `extractContent` | `() => string` | - | Custom content extractor |
| `onClickService` | `(id, context) => void` | - | Click callback for analytics |

## Web Component Attributes

```html
<summarize-with-ai
  theme="dark"
  mode="content"
  services="chatgpt,claude,perplexity"
  prefer-selection="true"
  max-chars="4000"
  prompt-prefix="As a developer..."
  gemini-style="app"
  compact
></summarize-with-ai>
```

## Theming with CSS Variables

Override any of these CSS variables to customize the appearance:

```css
.summarize-widget {
  --sw-bg: #ffffff;
  --sw-border: #e5e7eb;
  --sw-border-radius: 12px;
  --sw-gap: 0.5rem;
  --sw-padding: 1rem;
  --sw-font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  --sw-font-size: 14px;
  --sw-text-color: #374151;
  --sw-text-secondary: #6b7280;
  --sw-button-bg: #f9fafb;
  --sw-button-hover: #f3f4f6;
  --sw-button-active: #e5e7eb;
  --sw-button-border: #e5e7eb;
  --sw-button-radius: 8px;
  --sw-button-padding: 0.625rem 1rem;
  --sw-focus-ring: #3b82f6;
}
```

For Web Components, set variables on the element:

```css
summarize-with-ai {
  --sw-font-size: 13px;
  --sw-border-radius: 8px;
}
```

## Examples

### Compact Mode (Icons Only)

```js
SummarizeWidget.init({
  target: '#widget',
  compact: true
});
```

### Custom Services

```js
SummarizeWidget.init({
  target: '#widget',
  services: ['chatgpt', 'claude', 'perplexity']
});
```

### Content Mode with Selection

```js
SummarizeWidget.init({
  target: '#widget',
  mode: 'content',
  preferSelection: true,
  maxChars: 4000
});
```

### Custom Prompt

```js
SummarizeWidget.init({
  target: '#widget',
  promptPrefix: 'As a tech enthusiast, summarize the key insights from:'
});
```

### Analytics Callback

```js
SummarizeWidget.init({
  target: '#widget',
  onClickService: (serviceId, context) => {
    analytics.track('summarize_click', {
      service: serviceId,
      mode: context.mode,
      usedSelection: context.usedSelection
    });
  }
});
```

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Watch mode
npm run dev

# Type check
npm run typecheck
```

## License

MIT

