import { adminClient, inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { ac, admin, user } from "@/lib/auth/permissions";
import type { auth } from "@/server/auth";

export const authClient = createAuthClient({
	plugins: [
		adminClient({
			ac,
			roles: {
				admin,
				user,
			},
		}),
		inferAdditionalFields<typeof auth>(),
	],
});
