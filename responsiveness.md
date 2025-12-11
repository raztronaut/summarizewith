# Widget Mobile Layout - Technical Brief for Widget Developer

## The Problem
On mobile devices (≤480px), the widget buttons stack vertically instead of displaying horizontally. This is caused by the widget's internal CSS media query combined with Shadow DOM usage.

---

## Root Cause

### 1. Internal CSS Media Query
The widget contains this CSS:
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

### 2. Shadow DOM Blocks External Styling
- The web component uses Shadow DOM
- `.summarize-widget` and `.summarize-widget__buttons` are inside Shadow DOM
- **External CSS cannot penetrate Shadow DOM** - selectors like `summarize-with-ai .summarize-widget { }` have no effect
- `document.querySelectorAll('.summarize-widget').length` returns `0` because the class is hidden

---

## Possible Fixes

### Fix 1: Remove/Modify the Media Query (Simplest)
Remove or raise the breakpoint threshold in the widget's styles.

```css
/* Option A: Remove entirely */
/* Just delete the @media (max-width: 480px) block */

/* Option B: Lower breakpoint to only very small screens */
@media (max-width: 320px) { ... }

/* Option C: Use flex-wrap instead of column direction */
@media (max-width: 480px) {
  .summarize-widget__buttons {
    flex-wrap: wrap;
    justify-content: center;
  }
}
```

**Trade-off:** May not look good on very narrow screens.


---


### Fix 3: Add a `layout` or `responsive` Prop
Add an attribute to control layout behavior.

```html
<!-- User can disable responsive stacking -->
<summarize-with-ai layout="horizontal"></summarize-with-ai>
<summarize-with-ai responsive="false"></summarize-with-ai>
```

```javascript
// In component logic
if (this.getAttribute('layout') === 'horizontal') {
  // Force horizontal layout
}
```

**Trade-off:** Adds complexity and another prop to document.

---

### Fix 4: Use Container Queries Instead of Media Queries
Base layout on container width, not viewport width.

```css
.summarize-widget {
  container-type: inline-size;
}

@container (max-width: 200px) {
  .summarize-widget__buttons {
    flex-direction: column;
  }
}
```

**Trade-off:** Container queries have good but not universal browser support.

---

## Recommended Approach

**Short-term:** Implement Fix 1 (raise breakpoint to 320px or use flex-wrap) + Fix 3 (add `part` attributes).

---

## Testing Checklist
- [ ] Test on iPhone SE (320px wide)
- [ ] Test on iPhone 12/13/14 (390px wide)
- [ ] Test on Android devices (~360-412px wide)
- [ ] Test with all themes (light, dark, minimal, glass)
- [ ] Test with compact mode enabled/disabled
- [ ] Verify buttons remain clickable and readable at all sizes
