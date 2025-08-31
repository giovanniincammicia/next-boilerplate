---
description: 'Next.js development standards and instructions'
applyTo: '**/*.tsx, **/*.ts, **/*.jsx, **/*.js'
---

# Next.js Development Instructions

Instructions for high-quality Next.js applications.

## Project Context

- Latest Next.js (App Router)
- TypeScript for type safety

## Development Standards

### Architecture
- App Router with server and client components
- Group routes by feature/domain
- Implement proper error boundaries
- Do not overcomplicate, refactor your own code to find the best solution
- Use React Server Components by default
- Leverage static optimization where possible
- Force dynamic when the server component calls server functions

### TypeScript
- Strict mode enabled
- Clear type definitions
- Proper error handling with type guards
- Zod for runtime type validation

### State Management
- React Server Components for server state
- React hooks for client state
- Proper loading (using useTransition) and error states
- Optimistic updates where appropriate

### Data Fetching
- Server Components for direct database queries
- React Suspense for loading states and react `cache` for passing down promises
- Proper error handling and retry logic when necessary

### Server
- Server Actions for client-called functions
- Server Functions for abstracting server logic (e.g. createUser could be a server function that does a number of things, then ACTION_createUser wraps the function so that it can be called from the client and handles errors and responses)
- Add `import 'server-only'` to Server Functions and `use server` to Server Actions
- Always use `node` as the engine
- All Server Actions must be defined in the `src/server/actions` directory and they should have the same structure
- All Server Functions must be defined in the `src/server/functions` directory and they should have the same structure

### Security
- Input validation and sanitization
- Proper authentication checks
- Always check for OWASP10 vulnerabilities

### Performance
- Image optimization with next/image (never use `<img>`)
- Route prefetching
- Proper code splitting
- Bundle size optimization
- Use font optimization via next/font and load only necessary subsets
- Defer non-critical styles and avoid large CSS bundles on initial load

### Error Handling
- Always use the `tryCatch` function provided in `src/lib/utils.ts` instead of the native try/catch construct
- Always handle errors gracefully in Server Actions and provide user-friendly error messages
- Always check the `src/lib/diagnostics` folder for error related utils and components. You can find explanations and examples in the `README.md` file
- Errors in Server Functions should be handled using the `tryCatch` function and be re-thrown to be catched by the final tryCatch in the Server Action or the Server Component.

## Implementation Process
1. Look in the codebase for any existing components or patterns that can be reused, always follow the same structure as the existing code
2. Plan component hierarchy
3. Define types and interfaces
4. Implement server-side logic
5. Build client components
6. Add proper error handling
7. Implement responsive styling
8. Add loading states

## What to avoid
- Avoid unnecessary re-renders
- Avoid deeply nested components
- Avoid using `any` type in TypeScript
- Avoid using useState for loading, use useTransition instead
- Avoid creating NextJS routing related types, they are already provided in Next 15.5 with typedRoutes
- Avoid creating NextJS Route Handlers, use Server Actions instead
- Avoid redefining types that are already somewhere in the codebase