# CLAUDE.md

This file provides guidance to Claude Code (and other AI agents) when working with code in this repository.

## What this repo is

`@con2/components` is a shared React component library consumed by two apps, `kompassi-v2-frontend` and `larpit-fi`, both Next.js + TypeScript + react-bootstrap. It ships raw `.ts`/`.tsx` source — **there is no build step**. Consumers add this package to `transpilePackages` in their own `next.config.ts`, so their own Next compiler transpiles this library's source directly. Consequences:

- Don't add a `dist/`, a bundler config, or a `.d.ts` generation step. Source is the artifact.
- `"use client"` directives must be correct in the source itself — there's no downstream step that could add or strip them.
- Within this library, **use relative imports only** (`./Foo`, `../helpers/bar`), never a `@/` path alias. `transpilePackages` does not resolve this library's own tsconfig path aliases against the consumer's bundler — a `@/...` import here would silently resolve against the _consumer's_ `src/` tree instead and break.

Distribution is git-based (`"@con2/components": "github:con2/components#<tag>"`), not the npm registry — there's no `dist/` to publish, so releases are just commits/tags.

## Repository structure

- `src/components/` — components, one (or a small cluster) per file
- `src/icons/` — the shared Material Symbols icon set (see `src/icons/README.md` for how to add a new icon)
- `src/helpers/` — pure helper functions
- `src/index.ts`, `src/icons/index.ts`, `src/helpers/index.ts` — the three barrels; these are `package.json`'s `exports` map targets (`.`, `./icons`, `./helpers`). **Every new component/helper must be re-exported from the relevant barrel** or consumers can't import it.
- `demo/` — a throwaway Next.js App Router app, linked via a `file:..` dependency, that renders every component with sample data. See below — **keeping this in sync is required, not optional.**

## The translation-prop convention

Every component that renders user-visible text takes a `messages` prop — a plain object typed by a **local interface defined in the component's own file**, narrowed to exactly the keys it reads. Never import an app's `Translations` type into this library (that coupling is exactly what this library exists to eliminate). Date/locale-aware components additionally take an explicit `locale: string` prop. App-specific config (timezone, base URLs, auth provider id, etc.) must be an explicit prop with a sensible default — never read from either app's `@/config`.

**Never give a `messages` field a function type.** Function values can't cross a Server -> Client Component boundary, and both consuming apps commonly pass their whole `translations` object down into client components as a single prop — so a function-typed message field is a live crash waiting to happen at whichever call site does that (this actually happened: see `TextArea`'s history).

### The inline-generic-message pattern

Some messages are the same regardless of the calling context — "No file uploaded", a character-limit warning, an out-of-range warning. Asking every caller to supply a translation for these is pure friction with no payoff, and (per above) a function-typed shortcut to reduce that friction just trades it for a crash. The fix: skip `messages` for that field entirely and inline a small `Record<string, string>` (or `Record<string, {...}>`) table keyed by locale directly in the component's own module, falling back to `en` for an unrecognized locale (`table[locale] ?? table.en`). The component takes an explicit `locale: string` prop instead. Extend the table with `fi`/`en`/`sv` — the union of locales either consuming app supports — even if only one app currently uses the component.

Apply this per-field, not per-component: a component can have _both_ an inlined generic message and a caller-supplied `messages` prop for the fields that genuinely vary by context. Current examples:

- **Fully inlined** (no `messages` prop at all): `TextArea` (character-limit warning), `DateTimeInput` (out-of-range warning), `UploadedFileCards` (empty-state text), `MarkdownEditor` (a toolbar aria-label, via a plain string not even wrapped in a `messages` object originally).
- **Partially inlined** (`messages` prop kept for contextual fields, one generic field inlined): `SignInRequired` (`messages.title`/`message` explain _why_ sign-in is required and vary per call site; the "Sign in" button label is inlined, driven by a single shared translation key with no per-call-site override), `DimensionFilters` (`messages.searchPlaceholder` varies by what's being searched; the `<noscript>` fallback button's "Filter" label is inlined).

**The test is real usage, not intuition — check before inlining, don't just eyeball it.** Two things that _looked_ as generic as "No file uploaded" at a glance turned out not to be, once actually checked against both apps' translation files:

- `ModalButton`/`InterceptingRouteModal`'s `cancel`/`submit` — kompassi has dozens of real call sites overriding `submit` with action-specific verbs: "Generate", "Revoke", "Create quota", "Cancel order and request refund", "Close without accepting". A modal's confirm button should say what it _does_, not just "Submit". Both stayed a `messages: {cancel, submit}` prop.
- `CopyButton`'s `success` badge — assumed to always be "Copied!", but kompassi's real usage is a full sentence naming what got copied: "A link to the survey has been copied to clipboard." Stayed a `messages: {title, tooltip, success}` prop.

Both were briefly (wrongly) inlined during development before this check caught it. Before inlining a field, grep both consuming apps for every real call site's actual value, not just one - a single shared translation key used identically everywhere is safe to inline; several independently-written values, even if the first one or two you check happen to look generic, are not. "No consumer currently overrides it" is what you're checking for, not "it seems like it wouldn't need to be."

## The `en` locale renders dates as ISO 8601

Every date-rendering component/function (`FormattedDate`/`formatDate`, `FormattedDateRange`, `FormattedDateTime`/`formatDateTime`, `FormattedDateTimeRange`, `DateTimeInput`) renders its date component as ISO 8601 (`2027-02-06`) rather than the locale's native format when `locale` starts with `en` (case-insensitively, so `en-US`/`en-GB` are covered too) - `Intl`'s own `en` date format (`2/6/2027`) is ambiguous between day and month. A time component, if present in `options`, is unaffected and still follows the locale/options as normal. `fi`/`sv` are unaffected. A new date-rendering component must follow the same rule.

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

## Commit messages must follow Conventional Commits

**This is enforced, not a style preference.** CI has two things riding on it:

- The `commitlint` job rejects any non-conforming commit message on a PR.
- `semantic-release` (the `release` job, on push to `main`) determines the next version - and whether to release at all - by parsing commit types since the last tag. A commit that doesn't start with `feat:`, `fix:`, etc. is invisible to it: no version bump, no tag, no GitHub Release, even if real changes shipped.

Format: `<type>[optional !][optional (scope)]: <description>`, e.g. `feat: add ColorBadge component`, `fix(temporal): handle bare ISO date strings`, `feat!: drop Section and Heading`. Common types and what they trigger:

- `fix:` -> patch release
- `feat:` -> minor release
- `!` after the type/scope, or a `BREAKING CHANGE:` footer -> major release
- `chore:`, `docs:`, `test:`, `refactor:`, `ci:` -> no release triggered on their own (still required to pass `commitlint`, just don't bump the version by themselves)

If a change should ship a release, its commit message must be one of the release-triggering types above - `chore: add demo pages` will pass CI but silently produce no release.
