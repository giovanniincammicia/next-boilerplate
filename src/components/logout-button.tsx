"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/client";
import { AUTH_PATHS } from "@/lib/paths";
import { tryCatch } from "@/lib/utils";

export function LogoutButton() {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	function handleLogout() {
		startTransition(async () => {
			const [error] = await tryCatch(authClient.signOut());
			if (error)
				console.error("Logout failed:", error); // TODO: handle error
			else router.push(AUTH_PATHS.LOGIN());
		});
	}

	return (
		<Button Icon={LogOut} isLoading={isPending} onClick={handleLogout} variant="outline">
			Logout
		</Button>
	);
}
