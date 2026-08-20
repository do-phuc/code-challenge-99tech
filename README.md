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
npm run deploy:netlify   # production deploy via Netlify CLI (after link)
```

## Deploy (Netlify)

Same setup as the portfolio: Vite build to `dist`, SPA fallback for client routes.

- Config: [`netlify.toml`](netlify.toml) — `npm run build`, publish `dist`, `/*` → `/index.html` (200)
- Site: [phuc-do-code-challenge.netlify.app](https://phuc-do-code-challenge.netlify.app)
- Continuous deploy: push to `main` on [do-phuc/code-challenge-99tech](https://github.com/do-phuc/code-challenge-99tech)

```bash
npx netlify-cli login
npx netlify-cli link --name phuc-do-code-challenge
npm run build && npm run deploy:netlify
```

## Folders

| Path                | Role                                                              |
| ------------------- | ----------------------------------------------------------------- |
| `src/app`           | Bootstrap, router, global CSS                                     |
| `src/pages`         | Thin route screens (default-exported for `React.lazy`)            |
| `src/features`      | Domain modules — one folder per problem solution                  |
| `src/shared/ui`     | Reusable primitives (`Button`, `Card`, `Markdown`, `SplitLayout`, …) |
| `src/shared/layout` | `AppShell` page frame                                                |
| `src/shared/lib`    | `routes.ts`, `cn()`                                                  |

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
