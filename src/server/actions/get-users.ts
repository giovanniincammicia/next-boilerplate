"use server";

import { like } from "drizzle-orm";
import z from "zod";
import { db } from "@/db";
import { TABLE_user } from "@/db/schema/auth";
import { DatabaseError, ValidationError } from "@/lib/diagnostics/classes";
import { generateBaseError } from "@/lib/diagnostics/utils";
import { serverActionWrapper } from "@/lib/diagnostics/wrappers";
import { tryCatch } from "@/lib/utils";

const schema = z.object({
	filters: z.object({
		name: z.string().min(2).max(100).optional(),
	}),
});

export async function ACTION_getUsers(data: { filters: { name: string } }) {
	async function handler() {
		const parsed = schema.safeParse(data);
		if (!parsed.success) throw new ValidationError({ issues: parsed.error.issues });
		const { name } = parsed.data.filters;
		const whereClause = name ? like(TABLE_user.name, name) : undefined;
		const [error, users] = await tryCatch(db.select().from(TABLE_user).where(whereClause));
		if (error) throw new DatabaseError({ message: error.message });

		return users;
	}
	return serverActionWrapper(handler, () =>
		generateBaseError({
			clientMessage: "Failed to get users",
			component: "ACTION_getUsers",
			metadata: { data },
		}),
	);
}
