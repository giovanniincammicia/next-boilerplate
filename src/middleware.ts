import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { AUTH_PATHS } from "@/lib/paths";
import { tryCatch } from "@/lib/utils";
import { auth } from "@/server/auth";

export async function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname;
	const searchParams = request.nextUrl.searchParams;

	if (pathname.startsWith(AUTH_PATHS.LOGIN()) || pathname.startsWith("/api")) return NextResponse.next();

	const [error, session] = await tryCatch(
		auth.api.getSession({
			headers: request.headers,
		}),
	);

	// If there's an error or no session, redirect to login
	if (error || !session) {
		const redirectTo = encodeURIComponent(pathname + (searchParams.toString() ? `?${searchParams.toString()}` : ""));
		return NextResponse.redirect(new URL(AUTH_PATHS.LOGIN(redirectTo), request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for static files and API routes
		 */
		"/((?!_next/static|_next/image|favicon.ico).*)",
	],
	runtime: "nodejs",
};
