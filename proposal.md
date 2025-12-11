# Widget Responsiveness Proposal

## Overview

This proposal addresses mobile responsiveness and styling consistency issues for the `summarize-with-ai` widget when integrated by external users. The core problems stem from the widget's internal media query logic and the isolation provided by Shadow DOM.

---

## Current Issues Identified

### 1. Aggressive Mobile Breakpoint
The widget contains a media query at `480px` ([styles.ts:L293-301](file:///Users/razisyed/summarizewith/src/styles.ts#L293-L301)) that forces vertical stacking:

```css
@media (max-width: 480px) {
  .summarize-widget:not([data-compact="true"]) .summarize-widget__buttons {
    flex-direction: column;
  }
  .summarize-widget:not([data-compact="true"]) .summarize-widget__button {
    width: 100%;
  }
}
```

This affects common mobile devices (iPhone 12/13/14 at 390px, most Android phones at 360-412px), causing unwanted vertical stacking even when there's adequate horizontal space.

### 2. Shadow DOM Encapsulation
- The web component uses `attachShadow({ mode: 'open' })` ([web-component.ts:L78](file:///Users/razisyed/summarizewith/src/web-component.ts#L78))
- External CSS **cannot** override styles inside Shadow DOM
- Users have **no way** to customize layout behavior beyond provided attributes

### 3. Viewport vs. Container Awareness
The media query responds to **viewport width**, not the widget's **container width**. This leads to poor UX when:
- Widget is in a sidebar (narrow container on wide viewport)
- Widget is in a wide container on mobile (stacks unnecessarily)

---

## Recommended Changes

I recommend a **multi-pronged approach** combining several fixes for maximum flexibility:

### Fix 1: Replace Media Query with Container Query ⭐ (Primary)

**Rationale:** Container queries allow the widget to respond to its actual available space rather than the full viewport. This is the most semantically correct solution.

**Changes to [styles.ts](file:///Users/razisyed/summarizewith/src/styles.ts):**

```diff
 .summarize-widget {
+  container-type: inline-size;
   /* ... existing styles ... */
 }

-/* Responsive */
-@media (max-width: 480px) {
-  .summarize-widget:not([data-compact="true"]) .summarize-widget__buttons {
-    flex-direction: column;
-  }
-  
-  .summarize-widget:not([data-compact="true"]) .summarize-widget__button {
-    width: 100%;
-  }
-}
+/* Responsive - Stack buttons when widget container is narrow */
+@container (max-width: 280px) {
+  .summarize-widget:not([data-compact="true"]) .summarize-widget__buttons {
+    flex-direction: column;
+  }
+  
+  .summarize-widget:not([data-compact="true"]) .summarize-widget__button {
+    width: 100%;
+  }
+}
```

**Browser Support:** Container queries have [94%+ global support](https://caniuse.com/css-container-queries) (all modern browsers). The existing `flex-wrap: wrap` on `.summarize-widget__buttons` serves as a graceful fallback.

---

### Fix 2: Add `layout` Attribute for User Control

**Rationale:** Gives integrators explicit control when container queries aren't sufficient for their use case.

**Changes to [types.ts](file:///Users/razisyed/summarizewith/src/types.ts):**

```diff
 export interface SummarizeWidgetOptions {
   // ... existing options ...
+  /** Layout mode: 'auto' (default, uses container queries), 'horizontal' (always inline), 'vertical' (always stacked) */
+  layout?: 'auto' | 'horizontal' | 'vertical';
 }
```

**Changes to [web-component.ts](file:///Users/razisyed/summarizewith/src/web-component.ts):**

```diff
 static get observedAttributes(): string[] {
-  return ['theme', 'mode', 'services', 'prefer-selection', 'max-chars', 'prompt-prefix', 'gemini-style', 'compact'];
+  return ['theme', 'mode', 'services', 'prefer-selection', 'max-chars', 'prompt-prefix', 'gemini-style', 'compact', 'layout'];
 }
```

**Usage example:**
```html
<summarize-with-ai layout="horizontal"></summarize-with-ai>
```

**Changes to [styles.ts](file:///Users/razisyed/summarizewith/src/styles.ts) (new style rules):**

```css
/* Force horizontal layout */
.summarize-widget[data-layout="horizontal"] .summarize-widget__buttons {
  flex-direction: row !important;
  flex-wrap: wrap;
}

.summarize-widget[data-layout="horizontal"] .summarize-widget__button {
  width: auto !important;
}

/* Force vertical layout */
.summarize-widget[data-layout="vertical"] .summarize-widget__buttons {
  flex-direction: column !important;
}

.summarize-widget[data-layout="vertical"] .summarize-widget__button {
  width: 100% !important;
}
```

---

### Fix 3: Add CSS Custom Property Escape Hatch

**Rationale:** Allows advanced users to override specific values without full Shadow DOM penetration.

**Changes to [styles.ts](file:///Users/razisyed/summarizewith/src/styles.ts):**

```diff
 .summarize-widget {
   /* ... existing variables ... */
+  /* Layout behavior overrides via host page CSS custom properties */
+  --sw-button-direction: row;
+  --sw-button-width: auto;
 }

 .summarize-widget__buttons {
-  display: flex;
-  flex-wrap: wrap;
+  display: flex;
+  flex-direction: var(--sw-button-direction);
+  flex-wrap: wrap;
 }

 .summarize-widget__button {
+  width: var(--sw-button-width);
   /* ... existing styles ... */
 }
```

**Usage by integrators:**
```css
/* In host page CSS */
summarize-with-ai {
  --sw-button-direction: row;
  --sw-button-width: auto;
}
```

> [!NOTE]
> CSS custom properties **do** inherit into Shadow DOM, making this a valid escape hatch for power users.

---

### Fix 4: Lower Breakpoint Threshold (Minimal Change)

If a conservative approach is preferred, simply lower the breakpoint:

```diff
-@media (max-width: 480px) {
+@media (max-width: 320px) {
```

This only affects extremely narrow devices while preserving existing behavior.

---

## Summary of Proposed Changes

| Fix | Files Modified | Complexity | User Control | Browser Support |
|-----|----------------|------------|--------------|-----------------|
| **Container Query** | `styles.ts` | Low | Automatic | 94%+ |
| **`layout` Attribute** | `types.ts`, `web-component.ts`, `summarize-widget.ts`, `styles.ts` | Medium | Explicit | 100% |
| **CSS Custom Properties** | `styles.ts` | Low | Advanced | 100% |
| **Lower Breakpoint** | `styles.ts` | Trivial | None | 100% |

---

## Recommended Implementation Order

1. **Container Query (Fix 1)** — Primary improvement, solves most use cases automatically
2. **`layout` Attribute (Fix 2)** — Explicit control for edge cases  
3. **CSS Custom Properties (Fix 3)** — Power-user escape hatch
4. *(Optional)* Keep a fallback media query at `320px` for older browsers

---

## Verification Plan

### Mobile Device Testing (Not Just Viewport Resizing!)

> [!IMPORTANT]
> Simply resizing the browser viewport is **NOT** sufficient for mobile testing. You must use proper mobile device emulation that includes touch events, device pixel ratio (DPR), and accurate user-agent strings.

**Demo Site:** http://localhost:3000

### How to Properly Test on Mobile Display

#### Option 1: Chrome Device Mode (Recommended for Development)
1. Open http://localhost:3000 in Chrome
2. Open DevTools (⌘+Option+I)
3. Click the "Toggle Device Toolbar" icon (or ⌘+Shift+M)
4. Select a **specific device** from the dropdown (e.g., "iPhone 12 Pro", "Pixel 5") — not just a custom size
5. **Reload the page** after switching devices (important for proper DPR/touch simulation)

#### Option 2: Actual Mobile Device Testing
1. Ensure your dev server is accessible on the network
2. Find your Mac's local IP: `ifconfig | grep "inet " | grep -v 127.0.0.1`
3. On your phone, navigate to `http://<your-ip>:3000`

#### Option 3: Remote Debugging
- **iOS:** Safari → Develop menu → [Your iPhone]
- **Android:** Chrome → chrome://inspect → Remote devices

### Test Matrix

| Device | Width | DPR | Key Checks |
|--------|-------|-----|------------|
| iPhone SE | 320px | 2x | Smallest supported size |
| iPhone 12/13/14 | 390px | 3x | Most common iPhone |
| Pixel 5/6 | 393-412px | 2.75x | Most common Android |
| iPad Mini | 768px | 2x | Tablet portrait |

### Test Scenarios

1. **Container scenarios:**
   - Widget in full-width container
   - Widget in 300px sidebar
   - Widget in 200px narrow panel

2. **All themes:** default (glass), light, dark, minimal

3. **Compact mode:** enabled/disabled

4. **New `layout` attribute values:**
   - `layout="auto"` (default)
   - `layout="horizontal"`
   - `layout="vertical"`

### Quick Start

> [!WARNING]
> The demo site at `localhost:3000` loads the widget from the **CDN** — it won't reflect local code changes. Use `test-widget.html` for testing local edits.

```bash
# 1. Build the widget (after making changes to src/)
cd /Users/razisyed/summarizewith
npm run build

# 2. Serve test-widget.html locally (required for proper mobile emulation)
npx serve .
# Opens at http://localhost:3000 — navigate to /test-widget.html

# 3. Open http://localhost:3000/test-widget.html in Chrome with Device Mode
```

**For CDN testing (production version):**
```bash
cd /Users/razisyed/summarizewith/demo-site
npm run dev
# Open http://localhost:3000 in Chrome with Device Mode
```

---

## ✅ Decisions (Finalized)

| Decision | Choice |
|----------|--------|
| Approach | Full container query + `layout` attribute |
| 480px media query | **Remove entirely** |
| Attribute name | `layout` |

### Implementation Scope

1. **Replace** the `@media (max-width: 480px)` block with `@container (max-width: 280px)` in `styles.ts`
2. **Add** `container-type: inline-size` to `.summarize-widget`
3. **Add** `layout` attribute support (`auto`, `horizontal`, `vertical`) to:
   - `types.ts` (type definition)
   - `web-component.ts` (observed attributes + parsing)
   - `summarize-widget.ts` (render logic)
   - `styles.ts` (new CSS rules)
4. **Add** CSS custom property escape hatch (`--sw-button-direction`, `--sw-button-width`)
