# CLAUDE.md

This file provides guidance to Claude Code (and other AI agents) when working with code in this repository.

## What this repo is

`@con2/components` is a shared React component library consumed by two apps, `kompassi-v2-frontend` and `larpit-fi`, both Next.js + TypeScript + react-bootstrap. It ships raw `.ts`/`.tsx` source — **there is no build step**. Consumers add this package to `transpilePackages` in their own `next.config.ts`, so their own Next compiler transpiles this library's source directly. Consequences:

- Don't add a `dist/`, a bundler config, or a `.d.ts` generation step. Source is the artifact.
- `"use client"` directives must be correct in the source itself — there's no downstream step that could add or strip them.
- Within this library, **use relative imports only** (`./Foo`, `../helpers/bar`), never a `@/` path alias. `transpilePackages` does not resolve this library's own tsconfig path aliases against the consumer's bundler — a `@/...` import here would silently resolve against the *consumer's* `src/` tree instead and break.

Distribution is git-based (`"@con2/components": "github:con2/components#<tag>"`), not the npm registry — there's no `dist/` to publish, so releases are just commits/tags.

## Repository structure

- `src/components/` — components, one (or a small cluster) per file
- `src/icons/` — the shared Material Symbols icon set (see `src/icons/README.md` for how to add a new icon)
- `src/helpers/` — pure helper functions
- `src/index.ts`, `src/icons/index.ts`, `src/helpers/index.ts` — the three barrels; these are `package.json`'s `exports` map targets (`.`, `./icons`, `./helpers`). **Every new component/helper must be re-exported from the relevant barrel** or consumers can't import it.
- `demo/` — a throwaway Next.js App Router app, linked via a `file:..` dependency, that renders every component with sample data. See below — **keeping this in sync is required, not optional.**

## The translation-prop convention

Every component that renders user-visible text takes a `messages` prop — a plain object typed by a **local interface defined in the component's own file**, narrowed to exactly the keys it reads. Never import an app's `Translations` type into this library (that coupling is exactly what this library exists to eliminate). Date/locale-aware components additionally take an explicit `locale: string` prop. App-specific config (timezone, base URLs, auth provider id, etc.) must be an explicit prop with a sensible default — never read from either app's `@/config`.

## The demo app must stay in sync

**This is a hard requirement, not a nice-to-have.** The `demo/` app is how a human (or another agent) can actually see a component before trusting it. A library where the demo has silently rotted is worse than no demo at all — it actively misleads.

On every commit that touches `src/`:

- **It must compile.** Run `cd demo && npx tsc --noEmit` before considering the work done. A red demo build blocks the commit just like a red library build does.
- **New or changed components must be demonstrated.** Adding a component means adding `demo/src/app/<kebab-case-slug>/page.tsx` that renders it with realistic sample props/`messages` (not lorem ipsum) and covers its main variants. Changing a component's prop shape means updating its existing demo page to match — a demo page that still compiles against a stale prop shape by accident (e.g. because a prop became optional) is still a bug.
- **New demo pages must be linked from `demo/src/app/page.tsx`.** The index page is grouped by category (Layout, Text rendering, Forms & inputs, Data, Dates & locale, Feedback & messaging, Links & icons) — add new links to the appropriate group, or add a new group if none fits. An unlinked demo page is as good as a missing one.
- **Removing a component means removing its demo page** (and its link on the index page) in the same change — don't leave orphaned routes.
- Prefer Server Components for demo pages; only add `"use client"` to a demo page itself if the component genuinely needs local state to demonstrate (most don't — the component itself carries its own `"use client"` if it needs one).

## Development

```bash
npm install
npm test              # vitest run
npx tsc --noEmit       # typecheck
```

```bash
cd demo
npm install
npm run dev            # next dev — click through it before calling a change done
npx tsc --noEmit       # must pass before committing changes to src/
```

## Testing

Vitest + React Testing Library (jsdom). `vitest.setup.ts` wires up `@testing-library/jest-dom` and an explicit `afterEach(cleanup)` (this project runs with `globals: false`, so RTL's automatic cleanup doesn't register itself — don't remove that `afterEach`, tests will leak DOM state across each other silently).

Prioritize pure-logic units (helpers, `DataTable`'s cell-rendering functions, `temporal.ts`) — highest value per line. Add a render test for any new Tier-1-weight component.

## Before extracting/adding a component

Ask whether it's actually shared. This library exists because two apps converged on duplicate implementations — it is not a dumping ground for "generically useful" code that only one app happens to use. A component with a single call site across both consuming apps is a signal it may belong colocated with its one caller instead of here (see git history: `Section` and `Heading` were removed from this library for exactly this reason — `Section` had no caller using its differentiating feature, and `Heading` had exactly one caller, tied to the `SchemaForm` subsystem that's explicitly out of scope for this library).

## XSS-sensitive components

`LinebreaksDangerousHtml` and `ParagraphsDangerousHtml` render raw/dangerous HTML via `dangerouslySetInnerHTML`. Only ever pass them trusted content.
