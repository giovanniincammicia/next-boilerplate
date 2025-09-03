import type { ErrorReport } from "./validation";

export async function sendReport(report: ErrorReport): Promise<void> {
	await fetch("/api/report-error", {
		body: JSON.stringify({
			...report,
			url: typeof window !== "undefined" && window.location ? window.location.href : undefined,
		}),
		headers: {
			"Content-Type": "application/json",
		},
		method: "POST",
	});
	// TODO: what to do in case of success and failure?
}
