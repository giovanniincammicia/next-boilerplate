# Next.js Boilerplate

A production-ready Next.js boilerplate with modern tooling, type safety, and best practices built-in. This foundation provides everything you need to build scalable, maintainable web applications.

## 🚀 Features

### Core Stack

- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with Server Components
- **TypeScript** - Type safety throughout the application
- **Tailwind CSS 4** - Utility-first CSS framework
- **Shadcn/ui** - Beautiful and accessible UI components

### Database & ORM

- **Drizzle ORM** - Type-safe database toolkit
- **PostgreSQL** - Robust relational database
- **Database Migrations** - Version-controlled schema management

### Development Tools

- **Biome** - Fast linter and formatter
- **Lefthook** - Git hooks for automated quality checks
- **Commitlint** - Conventional commit message enforcement
- **TypeScript Reset** - Enhanced TypeScript experience

### Package Management

- **pnpm** - Fast, disk space efficient package manager
- **Turbopack** - Next.js's fast bundler for development

## 📁 Project Structure

```bash
next-boilerplate/
├── docs/                     # Project documentation
│   ├── db-migrations.md      # Database migration guide
│   └── project-setup.md      # Project setup instructions
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── layout.tsx        # Root layout component
│   │   ├── page.tsx          # Home page component
│   │   └── globals.css       # Global styles
│   ├── db/                   # Database configuration
│   │   ├── index.ts          # Database connection
│   │   └── schema.ts         # Drizzle schema definitions
│   ├── lib/                  # Utility functions
│   │   └── utils.ts          # Common utilities
│   ├── server/               # Server-side logic
│   ├── types/                # TypeScript type definitions
│   └── env.js                # Environment variable validation
├── biome.json                # Biome configuration
├── commitlint.config.js      # Commit message linting
├── components.json           # Shadcn/ui configuration
├── drizzle.config.ts         # Drizzle ORM configuration
├── lefthook.yml              # Git hooks configuration
├── next.config.js            # Next.js configuration
├── package.json              # Dependencies and scripts
├── postcss.config.mjs        # PostCSS configuration
└── tsconfig.json             # TypeScript configuration
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 22 or later
- PostgreSQL database
- pnpm

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd next-boilerplate
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Configure your database URL and other environment variables.

4. **Set up the database**

   ```bash
   pnpm db:generate
   pnpm db:migrate
   ```

5. **Start the development server**

   ```bash
   pnpm dev
   ```

6. **Configure MCP servers**
    - Update the `DATABASE_URI` in `.vscode/mcp.json` to match your PostgreSQL configuration.

### Project Setup Documentation

For comprehensive project setup including PRD, technical specifications, and infrastructure planning, follow the [project-setup.md](docs/project-setup.md) guide.

## 📜 Available Scripts

### Development

```bash
pnpm dev              # Start development server with Turbopack
pnpm build            # Build for production
pnpm start            # Start production server
pnpm ts               # Type check
pnpm check            # Run Biome linter and formatter
```

### Database Management

```bash
pnpm db:generate      # Generate migration files from schema changes
pnpm db:migrate       # Apply migrations to database
```

## 🔧 Configuration

### Environment Variables

The boilerplate uses `@t3-oss/env-nextjs` for type-safe environment variable validation. Configure your variables in `src/env.js`:

```javascript
server: {
  DATABASE_URL: z.url(),
  NODE_ENV: z.enum(["development", "test", "production"])
},
client: {
  // NEXT_PUBLIC_ prefixed variables
}
```

### Database Schema

Database schema is defined in `src/db/schema.ts` using Drizzle ORM. The boilerplate includes a basic users table:

```typescript
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
});
```

### Styling

The project uses Tailwind CSS 4 with Shadcn/ui components. Global styles are in `src/app/globals.css` and component utilities in `src/lib/utils.ts`.

## 🔍 Code Quality & Git Hooks

### Biome Configuration

- **Linting**: Comprehensive rules with Next.js domain-specific checks
- **Formatting**: Consistent code style with 130 character line width
- **Import Sorting**: Automatic import organization

### Git Hooks (Lefthook)

- **Pre-commit**: Runs type checking, linting, and formatting on staged files
- **Branch Naming**: Enforces conventional branch naming (`feature/`, `fix/`, `config/`, `chore/`)
- **Commit Messages**: Validates conventional commit format

### Commit Message Format

[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) are used to maintain a clear and consistent commit history. The format is:

```text
<type>: <description>

Types: feat, fix, docs, chore, config, refactor, test
```

## 🗄️ Database Migrations

This project uses Drizzle's codebase-first approach with SQL migration files for maximum safety and traceability.
If you want a lighter approach, you can use the strategy #2 from the official documentation: codebase-first without SQL migration files.
You can find the documentation for database migrations in [db-migrations.md](docs/db-migrations.md).

**Migration Workflow:**

1. Update schema in `src/db/schema.ts`
2. Generate migration: `pnpm db:generate`
3. Review generated SQL files
4. Apply migration: `pnpm db:migrate`

## 🧩 Component Library

The boilerplate is configured with [Shadcn/ui](https://ui.shadcn.com) for beautiful, accessible components:

- **Style**: New York theme with Slate base color
- **Icons**: Lucide React icon library
- **RSC**: React Server Components support
- **CSS Variables**: Tailwind CSS variables for theming

Add components:

```bash
npx shadcn-ui@latest add button
```

## 🔒 Type Safety

### TypeScript Configuration

- **Strict Mode**: Enabled for maximum type safety
- **Path Aliases**: `@/` mapped to `src/` directory
- **Next.js Types**: Automatic type generation for App Router

### Type Utilities

- **Total TypeScript Reset**: Enhanced standard library types
- **Drizzle Infer**: Automatic type inference for database operations
- **Zod Validation**: Runtime type validation for environment variables
