---
description: 'Styling development standards and best practices'
applyTo: '**/*.jsx, **/*.tsx, **/*.js, **/*.ts, **/*.css'
---

# Styling instructions

## Project Context (styling)
- Tailwind CSS for styling
- Shadcn UI for components
- Radix UI components (where applicable)

## Styling Standards
- Always use colors from `src/app/globals.css`, if you absolutely need a new color, add it there first and use the CSS variable, never hardcode colors in components
- Responsive design patterns
- Follow container queries best practices
- Maintain semantic HTML structure
- Prefer utility-first classes for layout and spacing; extract reusable component classes when needed
- Use design tokens (colors, spacing, typography) to keep styles consistent across the app

## Component Styling
- Build components with accessibility in mind (ARIA where necessary)
- Keep styles colocated with components when it improves maintainability (e.g., module files or component-local utilities)
- Use Tailwind's variant and plugin system for complex states and patterns
- Prefer composition (small primitives) over large, monolithic styled components
- Always use components from Shadcn UI and Radix UI where applicable, look into the `src/components` directory for available components.

## What to avoid (styling-specific)
- Avoid using inline styles (use Tailwind classes)
- Avoid duplicating utility classes across many files — extract when it improves clarity
- Avoid heavy runtime style computation in client components