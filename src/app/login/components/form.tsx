"use client";

import { useForm } from "@tanstack/react-form";
import type { Route } from "next";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { Form } from "@/components/form";
import { TextInput } from "@/components/form/text-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { authClient } from "@/lib/auth/client";
import { PATHS } from "@/lib/paths";
import { tryCatch } from "@/lib/utils";

const schema = z.object({
	email: z.email().min(1, "Email is required"),
	password: z.string().min(1, "Password is required"),
});

export function LoginForm() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const redirectTo = searchParams.get("redirectTo");

	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		onSubmit: async ({ value }) => {
			// TODO: transform this in a server action so you can log errors
			const [error, result] = await tryCatch(authClient.signIn.email(value));
			if (error || result.error) {
				// TODO: Handle login error (show toast, set form error, etc.)
				console.error("Login failed:", error || result.error);
				return;
			}

			router.push(redirectTo ? (decodeURIComponent(redirectTo) as Route) : PATHS.HOME);
		},
		validators: {
			onChange: schema,
		},
	});

	return (
		<div className="flex flex-col gap-6">
			<Card>
				<CardHeader>
					<CardTitle>Login to your account</CardTitle>
					<CardDescription>Enter your credentials below to login to your account</CardDescription>
				</CardHeader>
				<CardContent>
					<Form handleSubmit={form.handleSubmit}>
						<div className="flex flex-col gap-6">
							<form.Field name="email">{(field) => <TextInput field={field} label="Email" />}</form.Field>
							<form.Field name="password">{(field) => <TextInput field={field} label="Password" type="password" />}</form.Field>
							<div className="flex flex-col gap-3">
								<form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
									{([canSubmit, isSubmitting]) => (
										<Button className="w-full" disabled={!canSubmit} type="submit">
											{isSubmitting ? "Logging in..." : "Login"}
										</Button>
									)}
								</form.Subscribe>
							</div>
						</div>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
