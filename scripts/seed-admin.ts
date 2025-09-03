import { join } from "node:path";

process.loadEnvFile(join(process.cwd(), ".env"));

async function seedAdmin() {
	try {
		console.log("Creating admin user...");
		// Create admin user using Better Auth's signUp method
		const { auth } = await import("@/server/auth");

		const result = await auth.api.createUser({
			body: {
				data: {
					username: "admin",
				},
				email: "admin@local.placeholder",
				name: "Admin",
				password: "admin123!",
				role: "admin",
			},
		});

		if (result) console.log("✅ Admin user created successfully!");
	} catch (error) {
		if (error instanceof Error && error.message.includes("already exists")) {
			console.log("ℹ️  Admin user already exists, skipping creation.");
		} else {
			console.error("❌ Error creating admin user:", error);
			process.exit(1);
		}
	}
}

seedAdmin()
	.then(() => {
		console.log("Seeding completed.");
		process.exit(0);
	})
	.catch((error) => {
		console.error("Seeding failed:", error);
		process.exit(1);
	});
