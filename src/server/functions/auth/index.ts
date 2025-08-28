import "server-only";
import { headers } from "next/headers";
import { AuthError } from "@/lib/diagnostics/classes";
import { auth } from "@/server/auth";

export async function getUser() {
	const headersList = await headers();
	const session = await auth.api.getSession({
		headers: headersList,
	});
	if (!session)
		throw new AuthError({
			clientMessage: "Authentication required",
			component: "getUser",
			message: "Session not found - middleware should have handled this",
			userAgent: headersList.get("user-agent") || "unknown",
		});

	return session.user;
}
