# @con2/components

Shared React component library for `kompassi-v2-frontend` and `larpit-fi`. Ships raw TypeScript source — no build step. Consumers add this package's name to `transpilePackages` in their `next.config.ts` so Next's own compiler transpiles the source directly.

[Live demo](https://con2.github.io/components)

## Install

```json
{
  "dependencies": {
    "@con2/components": "github:con2/components#<tag-or-commit>"
  }
}
```

```ts
// next.config.ts
const nextConfig: NextConfig = {
  transpilePackages: ["@con2/components"],
};
```

## Entry points

- `@con2/components` — components (`import { DataTable, SubmitButton, ... } from "@con2/components"`)
- `@con2/components/icons` — the shared Material Symbols icon set
- `@con2/components/helpers` — pure helper functions

## Translation-prop convention

Every component that renders user-visible text takes a `messages` prop — a plain object typed by a **local interface defined in the component's own file**, narrowed to exactly the keys it reads. Never import an app's `Translations` type into this library. Date/locale-aware components additionally take an explicit `locale: string` prop. App-specific config (timezone, base URLs, auth provider id) are explicit props with sensible defaults, not `@/config` imports.

## Development

```
npm install
npm test          # vitest run
```

The `demo/` app is a throwaway Next.js App Router app that imports straight from this package's source via a `file:` dependency, exercising the same `transpilePackages` consumption path real consumers use.

```
cd demo
npm install
npm run dev
```

## Structure

- `src/components/` — components
- `src/icons/` — the Material Symbols icon set (see `src/icons/README.md` for how to add a new icon)
- `src/helpers/` — pure helper functions

## XSS-sensitive components

`LinebreaksDangerousHtml` and `ParagraphsDangerousHtml` render raw/dangerous HTML via `dangerouslySetInnerHTML`. Only pass them trusted content.
