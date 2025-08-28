# Next.js Boilerplate - GitHub Copilot Instructions

This is a modern Next.js boilerplate that uses PostgreSQL with Drizzle ORM, and Better Auth for authentication. The application provides a solid foundation for building scalable web applications with authentication, and database management.

**ALWAYS reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Bootstrap, Build, and Test the Repository

1. **Install Dependencies**
   ```bash
   pnpm install
   ```
   - **TIMING**: Takes ~35 seconds. NEVER CANCEL. Set timeout to 5+ minutes.
   - Uses pnpm v10.5.2 as specified in package.json
   - WARNING: May show build script warnings (e.g., protobufjs) - approve builds if prompted

2. **TypeScript Validation**
   ```bash
   pnpm ts
   ```
   - **TIMING**: Takes ~15 seconds. NEVER CANCEL. Set timeout to 5+ minutes.
   - **KNOWN ISSUE**: Currently shows type errors related to Next.js 15 route parameters being promises. These are expected and don't prevent the app from running.

3. **Linting and Formatting**
   ```bash
   pnpm check
   ```
   - **TIMING**: Takes ~3 seconds. NEVER CANCEL. Set timeout to 2+ minutes.
   - Uses Biome for linting and formatting
   - **KNOWN ISSUES**: Some CSS @theme warnings and forEach callback return warnings - these are non-critical

### Running the Application

1. **Development Server**
   ```bash
   pnpm dev
   ```
   - Never run the development server without explicit user permission

2. **Production Build**
   ```bash
   pnpm build
   ```
   - Never run the build without explicit user permission

3. **Production Server**
   ```bash
   pnpm start
   ```
   - Never start the production server without explicit user permission

## Validation

### Mandatory Validation Steps
- **ALWAYS run `pnpm check` and fix any NEW linting errors before committing**
- **ALWAYS run `pnpm ts` to catch TypeScript errors**

### Build Validation
- TypeScript compilation should complete 
- Linting should pass or show only known issues

## Common Tasks

### Database Operations

1. **Generate New Migration**
   ```bash
   pnpm db:generate --name MIGRATION_NAME
   ```
   - **TIMING**: Takes ~2 seconds. NEVER CANCEL.

2. **Apply Migrations**
   ```bash
   pnpm db:migrate
   ```
   - Never apply migrations to the database without explicit user permission

### Code Quality

1. **Linting and Auto-fix**
   ```bash
   pnpm check
   ```
   - Automatically fixes many issues

2. **TypeScript Check**
   ```bash
   pnpm ts
   ```

3. **Git Hooks** 
   - Lefthook is configured for pre-commit validation
   - Runs Biome check, TypeScript validation, and branch name validation
   - Requires branch names to match pattern: `feature/`, `fix/`, `config/`, or `chore/`

4. **Commit Message Validation**
   - Commit messages must follow the Conventional Commits specification

## Repository Structure

### Key Directories
- `/src/app/` - Next.js App Router pages and layouts
- `/src/components/` - Reusable React components
- `/src/db/` - Database connection and schema definitions
- `/src/hooks/` - Custom React hooks
- `/src/lib/` - Utility functions and configurations
- `/src/server/` - Server-side authentication and API utilities
- `/drizzle/` - Database migration files
- `/scripts/` - Utility scripts
- `/docs/` - Project documentation

### Important Files
- `package.json` - Dependencies and scripts
- `.env.example` - Environment variable template
- `drizzle.config.ts` - Database configuration
- `biome.json` - Linting and formatting configuration
- `lefthook.yml` - Git hooks configuration
- `docker-compose.yml` - Local development services

### Database Schema
- **Authentication**: Managed by Better Auth (users, sessions, accounts)
- **Core Tables**: Define your application-specific tables here

## Project Architecture

### Technology Stack
- **Frontend**: Next.js 15 with App Router, React 19, TypeScript
- **Styling**: Tailwind CSS v4, Radix UI components, Shadcn UI
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Better Auth
- **Build Tool**: Turbopack (Next.js)
- **Linting**: Biome
- **Package Manager**: pnpm

### Key Features
- Multi-role authentication system
- Type-safe database operations with Drizzle ORM
- Responsive design with dark mode support
- Modern development tooling and CI/CD setup

## Development Guidelines

### Code Style and Standards
- Follow TypeScript strict mode conventions
- Use functional components with hooks
- Implement proper error boundaries
- Follow REST API conventions for endpoints
- Use proper HTTP status codes
- Implement proper input validation and sanitization

### Database Best Practices
- Always use parameterized queries
- Implement proper indexing strategies
- Use transactions for multi-table operations
- Follow database normalization principles
- Implement soft deletes where appropriate

### Security Considerations
- Never expose sensitive data in client-side code
- Implement proper CORS policies
- Use environment variables for configuration
- Follow OWASP security guidelines
- Implement rate limiting for public APIs

### Performance Optimization
- Use Next.js Image component for images
- Implement proper caching strategies
- Use React.memo for expensive components
- Implement pagination for large datasets
- Optimize database queries with proper joins

## AI Development Assistance

### Code Generation Guidelines
- Always provide type-safe TypeScript code
- Include proper error handling
- Add meaningful comments for complex logic
- Follow the existing project patterns
- Generate tests when appropriate

### Common Patterns to Follow
- Server Actions for form submissions
- Custom hooks for data fetching
- Proper component composition
- Consistent file naming conventions
- Proper separation of concerns

### When Working with Database
- Always generate migrations for schema changes
- Use Drizzle query builder for type safety
- Implement proper relations between tables
- Consider performance implications of queries

### API Development
- Use Next.js Route Handlers for API endpoints
- Implement proper request validation
- Return consistent response formats
- Include proper error messages
- Use appropriate HTTP status codes
- Use Server Actions instead of API Routes unless explicitly asked

## Known Issues and Limitations

### Linting Warnings
- forEach callback return value warnings (non-critical)
- These don't prevent development but should be addressed

### Next.js 15 Considerations
- Route parameters are now promises (async/await required)
- Some third-party libraries may need updates
- TypeScript errors related to route params are expected

## General Rules
- Never change the `.vscode/settings.json` file
- Never add NextJS routing related types, they are already provided in Next 15.5
- Never run build commands or database operations without explicit permission
- Never change the files in `/drizzle/meta`
- Never create files directly in `/drizzle`, always use the `pnpm db:generate` command
- Always validate TypeScript and linting before suggesting code changes
- Follow the established patterns and conventions in the codebase

## Troubleshooting

### Common Issues
1. **pnpm not found**: Install with `npm install -g pnpm`
2. **Database connection fails**: Check Docker container status or local PostgreSQL
3. **Build fails**: Usually network-related, use development server instead
4. **TypeScript errors**: Known issue with Next.js 15, ignore route parameter errors
5. **Permission errors**: Ensure proper file permissions and database access

### Getting Help
- Check the project's README.md for setup instructions
- Use GitHub issues for reporting bugs