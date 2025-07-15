# Drizzle Migrations: Codebase-First with SQL Migration Files

[Drizzle ORM Migration Guide](https://orm.drizzle.team/docs/migrations)

This project uses Drizzle ORM's recommended workflow for managing database schema:

- **Schema as Code:** Define your database schema in TypeScript.
- **Migration Generation:** Use Drizzle to generate SQL migration files based on schema changes.
- **Migration Application:** Apply migrations to your database using the Drizzle CLI.

This approach was chosen instead of approach 2 because it's safer and more robust for production, especially in regulated, multi-environment, or team settings. It combines the benefits of codebase-first development with the reliability and traceability of migration files, and is well-suited for automated, serverless deployments.

## Example: Defining a Table

```typescript
import * as p from "drizzle-orm/pg-core";

export const users = p.pgTable("users", {
  id: p.serial().primaryKey(),
  name: p.text(),
  email: p.text().unique(),
});
```

### Generating a Migration

```bash
drizzle-kit generate
```

1. read previous migration folders
2. find diff between current and previous schema
3. prompt developer for renames if necessary
4. generate SQL migration and persist to file

Example output:

```bash
drizzle/
  20242409125510_some_migration/
    snapshot.json
    migration.sql
```

Sample generated SQL:

```sql
-- drizzle/20242409125510_some_migration/migration.sql
CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT,
  "email" TEXT UNIQUE
);
```

### Applying Migrations

```bash
drizzle-kit migrate
```

1. read migration.sql files in migrations folder
2. fetch migration history from database
3. pick previously unapplied migrations
4. apply new migration to the database

**Summary:**  

- Edit your schema in TypeScript.
- Run `drizzle-kit generate` to create migration files.
- Run `drizzle-kit migrate` to apply them to your database.
