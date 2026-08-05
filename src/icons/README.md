# Google Material Symbols

## Hand-picked SVG icons made into React components

Using Google Fonts hosted by Google is a GDPR hazard. There is no `next/font/material-symbols` as of 07/2025.

Current approach is as follows:

1. Find a symbol you want in the [icon search](https://fonts.google.com/icons)
2. Configure the following settings:

   - **Weight**: 400
   - **Grade**: 0
   - **Style**: Material Symbols (New), Outlined
   - **Optical size**: 24px

3. Download the SVG
4. Using eg. `OpenInNewTab.tsx` as a template, make the SVG into a React component in this directory
   - Export the component as a named export, eg. `export function MyIcon() { ... }`.
   - Give the root `<svg>` element `className="material-symbol"`.
   - You may need to tweak the vertical translate to make the icon align with text.
   - Use relative imports only (eg. `./OpenInNewTab`) — never a `@/` path alias — since this library is consumed via `transpilePackages` and a `@/...` import would resolve against the consumer's own `src/` tree instead of this package.

The `.material-symbol` class lives in `material-symbol.css` in this directory. Consumers of `@con2/components` (or this package's own entry point) must import that stylesheet once, eg.:

```ts
import "@con2/components/src/icons/material-symbol.css";
```

## License

Material Symbols are available under the [Apache License Version 2.0](https://www.apache.org/licenses/LICENSE-2.0.html).
