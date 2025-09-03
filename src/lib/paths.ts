import type { Route } from "next";

// TODO: no type inference and validation for dynamic routes

// biome-ignore lint/suspicious/noExplicitAny: no need to enforce type here, each function will handle the parameter
type PathMap = Record<string, Route | ((...args: any[]) => Route) | Record<string, Route | ((...args: any[]) => Route)>>;

// Root paths
export const PATHS = {
	HOME: "/",
} as const satisfies PathMap;

// Authentication paths
export const AUTH_PATHS = {
	LOGIN: (redirectTo?: string) => (redirectTo ? `/login?redirectTo=${encodeURIComponent(redirectTo)}` : "/login"),
} as const satisfies PathMap;
