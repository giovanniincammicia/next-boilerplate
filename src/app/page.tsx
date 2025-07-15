import { db } from "@/db";
import { users } from "@/db/schema";

export default async function Home() {
	const userData = await db.select().from(users);
	return <main>Hello world - {userData.length} users.</main>;
}
