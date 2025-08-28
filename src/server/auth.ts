import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";
import { db } from "@/db";
import { TABLE_account, TABLE_session, TABLE_user, TABLE_verification } from "@/db/schema/auth";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: {
			account: TABLE_account,
			session: TABLE_session,
			user: TABLE_user,
			verification: TABLE_verification,
		},
	}),
	emailAndPassword: {
		autoSignIn: false,
		enabled: true,
		requireEmailVerification: false,
	},
	plugins: [
		admin(),
		// nextCookies should always be the last plugin
		// https://www.better-auth.com/docs/integrations/next#server-action-cookies
		nextCookies(),
	],
	telemetry: { enabled: false },
	user: {
		additionalFields: {
			// Add any additional fields for the user here
		},
	},
});

export type Session = typeof auth.$Infer.Session;
