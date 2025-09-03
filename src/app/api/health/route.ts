import { db } from "@/db";
import { tryCatch } from "@/lib/utils";

export async function GET() {
	const [error, dbstatusRes] = await tryCatch(db.$client.query("SELECT 1 AS ok"));
	const dbStatus = !error && dbstatusRes.rows[0].ok ? "on" : "off";
	return Response.json({ db: { status: dbStatus } }, { status: 200 });
}
