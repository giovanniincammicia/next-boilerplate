"use client"; // Error boundaries must be Client Components
import { AlertTriangle } from "lucide-react";
import { useEffect, useTransition } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { sendReport } from "@/lib/diagnostics/client-reporter";
import { tryCatch } from "@/lib/utils";

export default function ErrorPage({ error, reset }: AppErrorProps) {
	const [isPending, startTransition] = useTransition();
	useEffect(() => {
		(async () => {
			const [reportError] = await tryCatch(sendReport({ digest: error.digest, message: error.message }));
			if (reportError) console.error("Failed to report error:", reportError);
		})();
	}, [error]);

	function handleRetry() {
		startTransition(() => {
			reset();
		});
	}

	return (
		<div className="min-h-screen flex items-center justify-center p-4 bg-background">
			<Card className="w-full max-w-md">
				<CardHeader className="text-center">
					<div className="mx-auto mb-4 w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center">
						<AlertTriangle className="w-6 h-6 text-destructive" />
					</div>
					<CardTitle className="text-xl">Something went wrong</CardTitle>
					<CardDescription>
						We encountered an unexpected error. Our team has been notified and is working to fix it.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<Alert>
						<AlertTriangle className="h-4 w-4" />
						<AlertDescription>Please try refreshing the page. If the problem persists, contact support.</AlertDescription>
					</Alert>
					<Button className="w-full" isLoading={isPending} onClick={handleRetry}>
						Try again
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
