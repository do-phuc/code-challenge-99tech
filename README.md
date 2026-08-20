# Frontend challenge

Vite + React + TypeScript site for submitting frontend interview solutions. Four routes: an index of
the three problems, and one page per solution.

## Scripts

```bash
npm install
npm run dev      # local server
npm run build    # typecheck + production bundle
npm run lint
npm run preview
```

## Folders

| Path                | Role                                                              |
| ------------------- | ----------------------------------------------------------------- |
| `src/app`           | Bootstrap, router, global CSS                                     |
| `src/pages`         | Thin route screens (default-exported for `React.lazy`)            |
| `src/features`      | Domain modules — one folder per problem solution                  |
| `src/shared/ui`     | Reusable primitives (`Button`, `Card`, `PageHeader`, `Container`) |
| `src/shared/layout` | `AppShell` page frame                                             |
| `src/shared/lib`    | `routes.ts`, design tokens, `cn()`                                |

Pages compose features. Features own problem logic. Shared UI stays generic.

## Conventions worth knowing

- **Lazy routes.** Each page is `React.lazy` + `Suspense` so problem code splits into its own chunk.
- **Landmarks.** Every page is a `<main>` with one `h1`. Home’s problem list is a page-level
  `<nav>`.
- **Links vs buttons.** Navigation uses real anchors (`Link` / `Card`). `Button` is a `<button>`
  unless you pass `as={Link}`.
- **Ids.** Interactive elements take a required `id` (tests, a11y, analytics).
- **Motion.** Hover/transform animations respect `prefers-reduced-motion`.
- **Styles.** Colors and type live as CSS variables in `src/app/styles.css`.
