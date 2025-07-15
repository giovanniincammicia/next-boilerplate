import { pgTable, uuid } from "drizzle-orm/pg-core";

// Users table
export const users = pgTable("users", {
	id: uuid("id").primaryKey().defaultRandom(),
});

// Export all tables for use in queries
export type Users = typeof users.$inferSelect;
export type NewUsers = typeof users.$inferInsert;
