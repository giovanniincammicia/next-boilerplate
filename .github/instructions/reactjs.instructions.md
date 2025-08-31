---
description: 'ReactJS development standards and best practices'
applyTo: '**/*.jsx, **/*.tsx, **/*.js, **/*.ts'
---

# ReactJS Development - Concise Guidelines

## Purpose
- Lightweight, actionable React + TypeScript guidance aligned to the repository conventions.
- Prefer clarity and reuse over verbosity. Follow repo-wide policies (security, performance, comments, tooling).

## Core principles
- Keep components small, single-responsibility, and composable.
- Prefer functional components + hooks.
- Favor type inference using `typeof`, `Parameters`, `ComponentProps` and `ReturnType`
- Code should be self-explanatory; comment WHY, not WHAT. Avoid unnecessary comments.

## Tooling & validation (required)
- Never run the project or build if not explicitly asked
- Follow existing repo patterns and reuse components/hooks from `src/`.
- Use `pnpm` and the versions pinned in `package.json`.

## Architecture & Types
- Use feature-oriented folders and custom hooks for shared stateful logic.
- Define interfaces/types for props and public APIs. Prefer narrow, explicit types.
- Use `React.FC` or explicit function types when helpful for readability.

## State & data
- `useState` for simple local state; `useReducer` for complex state transitions.
- Prefer server actions (Next.js App Router) unless explicitly asked to use API routes.
- For server state use React Query if necessary (or patterns present in repo). Implement loading, error, and empty states.
- Use [Nuqs](https://nuqs.47ng.com/) for search params state management
- Use optimistic updates for better user experience with `useOptimistic`

## Forms & validation
- Use controlled components and typed schemas (Zod + TanStack Forms if already in repo).
- Debounce validation when appropriate; provide clear UX for errors.

## Performance
- Optimize only after measuring.
- Use `React.memo`/`useMemo`/`useCallback` selectively for expensive work.
- Code-split with dynamic imports and lazy when it reduces initial bundle size.

## Security (apply OWASP rules)
- Sanitize and validate all user input before use or rendering.
- Use context-aware escaping (avoid `innerHTML`). If sanitized HTML is required, use a vetted sanitizer.
- Never hardcode secrets; read from environment.
- Follow the repo's secure-coding instructions for DB and SSRF protections.

## Accessibility
- Use semantic HTML, proper labels, and ARIA attributes where needed.
- Ensure keyboard accessibility for interactive elements and provide alt text for images.

## Error handling & observability
- Add error boundaries for top-level UI groups.
- Surface actionable error messages to users; log details for diagnostics.
- Keep network and performance telemetry consistent with repo tooling.

## Code style & comments
- Prefer clear names and small functions over explanatory comments.
- Use comments to explain intent, constraints, or non-obvious decisions only.
- Adhere to the project's linting/format rules (Biome).

## Dependencies & changes
- Prefer small, well-adopted libraries; pick the latest stable version and justify additions.

## Repository-specific rules
- Do not modify `.vscode/settings.json`.
- Do not add files directly under `/drizzle` (use `pnpm db:generate`).
- Respect existing commit hooks and branch naming conventions.
- Validate TypeScript and linting before pushing changes using `pnpm ts` and `pnpm check`.

## Implementation checklist (minimal)
- Search for existing components/hooks to reuse.
- Run `pnpm ts` and `pnpm check`; fix issues.

## Further details and exceptions
- Refer to repository-level instruction files for security, containerization, and prompt-engineering rules.
- When in doubt follow existing code patterns present in `src/`; prefer minimal surgical changes over large refactors.