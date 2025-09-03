import "server-only";

import { headers } from "next/headers";
import { getUser } from "@/server/functions/auth";
import { tryCatch } from "../utils";
import type { ErrorReport } from "./validation";

type GenerateBaseErrorParams = Pick<ErrorReport, "component" | "clientMessage" | "metadata" | "url">;

export async function generateBaseError(params: GenerateBaseErrorParams): Promise<Partial<ErrorReport>> {
	const [error, currentUser] = await tryCatch(getUser());
	const h = await headers();
	return {
		...params,
		userAgent: h.get("user-agent") || "unknown",
		userId: error || !currentUser ? "<unknown>" : currentUser.id,
	};
}
