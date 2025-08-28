import "server-only";
import { headers } from "next/headers";
import { getUser } from "@/server/functions/auth";
import type { ErrorReport } from "./validation";

type GenerateBaseErrorParams = Pick<ErrorReport, "component" | "clientMessage" | "metadata" | "url">;

export async function generateBaseError(params: GenerateBaseErrorParams): Promise<Partial<ErrorReport>> {
	const currentUser = await getUser();
	const h = await headers();
	return {
		...params,
		userAgent: h.get("user-agent") || "unknown",
		userId: currentUser.id,
	};
}
