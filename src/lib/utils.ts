import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
export const isNullish = (value: unknown) => value === null || value === undefined;
export const isEmptyObject = (obj: unknown): obj is EmptyObject =>
	typeof obj === "object" && obj !== null && "__empty" in obj && !!obj.__empty;
export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
export const range = (start: number, end: number) => {
	const length = end - start + 1;
	return Array.from({ length }, (_, i) => start + i);
};

export async function tryCatch<T, E extends Error = Error>(promise: Promise<T>) {
	try {
		const data = await promise;
		return [null, data] as const;
	} catch (e) {
		const error = e instanceof Error ? e : typeof e === "string" ? new Error(e) : new Error("Unknown error");
		return [error as E, null] as const;
	}
}

export function downloadBlob(blob: Blob, filename: string) {
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
}
