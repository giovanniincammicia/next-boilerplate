import { db } from "@/db";
import { TABLE_user } from "@/db/schema/auth";

export const dynamic = "force-dynamic";

export default async function Home() {
	const userData = await db.select().from(TABLE_user);
	return <main>Hello world - {userData.length} users.</main>;
}
