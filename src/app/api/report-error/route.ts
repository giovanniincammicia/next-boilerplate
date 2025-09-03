import { ClientError, GenericError, ValidationError } from "@/lib/diagnostics/classes";
import { generateBaseError } from "@/lib/diagnostics/utils";
import { errorSchema } from "@/lib/diagnostics/validation";
import { apiWrapper } from "@/lib/diagnostics/wrappers";
import { tryCatch } from "@/lib/utils";

export async function POST(request: Request) {
	async function handler() {
		// Try to parse the JSON body
		const [jsonError, body] = await tryCatch(request.json());
		if (jsonError)
			throw new GenericError({
				message: "Failed to parse JSON",
				metadata: {
					body,
					error: jsonError.message,
				},
			});

		// Validate the request body
		const result = errorSchema.safeParse(body);
		if (!result.success) {
			throw new ValidationError({
				issues: result.error.issues,
				metadata: {
					body,
				},
			});
		}

		throw new ClientError(result.data);
	}

	return apiWrapper(handler, () =>
		generateBaseError({
			clientMessage: "Failed to report error",
			component: "api/report-error",
			url: request.referrer,
		}),
	);
}
