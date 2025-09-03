"use client";

import { useEffect } from "react";

export function ErrorHandler() {
	useEffect(() => {
		const handleError = (_event: ErrorEvent | PromiseRejectionEvent) => {
			// TODO: report error
		};

		window.addEventListener("error", handleError);
		window.addEventListener("unhandledrejection", handleError);

		return () => {
			window.removeEventListener("error", handleError);
			window.removeEventListener("unhandledrejection", handleError);
		};
	}, []);

	return null;
}
