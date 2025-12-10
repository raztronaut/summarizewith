# Widget Changes & Upgrade Instructions

## Summary of Changes
We have promoted the "Liquid Glass" theme to be the **default** appearance of the `summarize-with-ai` widget.

### 1. Default Glass Theme
- **Behavior**: If the `theme` attribute is omitted (or set to `default`), the widget now renders with a translucent, blurred glass effect (`backdrop-filter: blur(16px)`).
- **Adaptive**: The text color is set to `inherit`, allowing it to adapt to light or dark backgrounds automatically.
- **Overrides**: The `light` and `dark` themes are now strictly enforced overrides that disable the glass effect and set solid backgrounds.

### 2. Styling Refinements
- **Opacity**: Reduced from ~25% to 10% for a cleaner, more readable look on dark backgrounds.
- **Blur**: Increased to 16px.
- **Contrast**: Header opacity tuned to 0.8 for visual hierarchy while maintaining readability.

---

## Instructions for `summarizewith-web`

Use these instructions to update the demo website.

### 1. Update Dependency
Update the `summarize-with-ai` package to the latest version (likely `1.0.8` or newer).

```bash
npm install summarize-with-ai@latest
```

### 2. Check for Manual Overrides
Scan the codebase for any manual CSS or style injections that were mimicking a glass effect.
- **Look for**: Classes or inline styles on the widget wrapper setting `backdrop-filter`, `background: rgba(...)`, or `border-color`.
- **Action**: **REMOVE THEM.** The widget now handles this natively.

### 3. Verify Theme Usage
- **If you want the glass look**: Ensure the `<summarize-with-ai>` tag has **NO** `theme` attribute (or `theme="default"`).
- **If you want the old solid look**: You MUST explicitly add `theme="light"` or `theme="dark"`.

### 4. Integration Context
- The widget is designed to sit on top of rich backgrounds (gradients, images, shaders). ensure it's placed in a container with `position: relative` or `absolute` to interact with the background correctly.
