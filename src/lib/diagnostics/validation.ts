import z from "zod";

export const ERROR_CODES = {
	AUTH_ERROR: "AUTH_ERROR",
	CLIENT_ERROR: "CLIENT_ERROR",
	DATABASE_ERROR: "DATABASE_ERROR",
	EXTERNAL_SERVICE_ERROR: "EXTERNAL_SERVICE_ERROR",
	GENERIC_ERROR: "GENERIC_ERROR",
	NOT_FOUND_ERROR: "NOT_FOUND_ERROR",
	SERVER_ERROR: "SERVER_ERROR",
	VALIDATION_ERROR: "VALIDATION_ERROR",
} as const;

export type ErrorCode = keyof typeof ERROR_CODES;

export const errorSchema = z.object({
	component: z.string().optional(),
	correlationId: z.string().optional(),
	digest: z.string().optional(),
	message: z.string().min(1).max(500),
	metadata: z.record(z.string(), z.unknown()).optional(),
	url: z.url().optional(),
	userAgent: z.string().optional(),
	userId: z.string().optional(),
});

export type ErrorReport = z.infer<typeof errorSchema> & {
	status?: number;
	clientMessage?: string;
};
