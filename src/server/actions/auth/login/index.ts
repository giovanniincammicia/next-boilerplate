"use server";

import { AuthError, ValidationError } from "@/lib/diagnostics/classes";
import { generateBaseError } from "@/lib/diagnostics/utils";
import { serverActionWrapper } from "@/lib/diagnostics/wrappers";
import { tryCatch } from "@/lib/utils";
import { auth } from "@/server/auth";
import { type Input, schema } from "./schema";

export async function ACTION_login(data: Input) {
	async function handler() {
		const parsed = schema.safeParse(data);
		if (!parsed.success) throw new ValidationError({ issues: parsed.error.issues });

		const [error, session] = await tryCatch(auth.api.signInEmail({ body: parsed.data }));
		if (error) throw new AuthError(error);

		return session.user;
	}
	return serverActionWrapper(handler, () =>
		generateBaseError({
			clientMessage: "Failed to login",
			component: "ACTION_login",
			metadata: { data },
		}),
	);
}
