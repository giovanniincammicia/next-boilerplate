import { tryCatch } from "../utils";
import { AppError, GenericError, ServerError } from "./classes";
import { getLogger } from "./logger";
import type { ErrorReport } from "./validation";

async function baseWrapper<T>(
	handler: () => Promise<T>,
	getBaseError: () => Promise<Partial<ErrorReport>> = () => Promise.resolve({}),
) {
	const [handlerException, data] = await tryCatch(handler());
	if (handlerException) {
		const error =
			handlerException instanceof AppError
				? handlerException
				: new GenericError({ clientMessage: "Unexpected Server Error", message: handlerException.message });

		// getBaseError may throw as well
		const [getBaseErrorException, baseError] = await tryCatch(getBaseError());
		if (getBaseErrorException) getLogger()?.error(getBaseErrorException.message, new ServerError(getBaseErrorException));

		const extendedError = baseError ? error.extend(baseError) : error;
		getLogger()?.error(error.message, extendedError);
		return { error: extendedError.clientMessage ?? "Server Error", success: false } as const;
	}
	return { data, success: true } as const;
}

export async function apiWrapper<T>(...params: Parameters<typeof baseWrapper<T>>) {
	const res = await baseWrapper(...params);
	return Response.json(res, { status: res.success ? 200 : 500 });
}

export const serverActionWrapper = baseWrapper;
