import { unauthorized } from "next/navigation";
import { tryCatch } from "@/lib/utils";
import { getUser } from "@/server/functions/auth";

export const dynamic = "force-dynamic";

export default async function Home() {
	const [userError, user] = await tryCatch(getUser());
	if (userError) unauthorized();

	return <main>Hello {user.name}</main>;
}
