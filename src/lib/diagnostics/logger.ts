import winston from "winston";
import { File as FileTransport } from "winston/lib/winston/transports";
import { env } from "@/env";
import { tryCatch } from "../utils";
import type { AppError } from "./classes";

type LoggingTransports = NonNullable<Parameters<typeof winston.createLogger>[0]>["transports"];
function getLoggingTransports(): LoggingTransports {
	if (env.NODE_ENV !== "production")
		return [
			new FileTransport({
				filename: "dev.log",
			}),
		];
	return []; // Add here your log transport
}

type ErrorReportingTransport = { report: (object: JSObject) => void } | null;
function getErrorReportingTransport(): ErrorReportingTransport {
	if (env.NODE_ENV !== "production") return null;
	return null; // Add here your error reporting transport
}

export function getLogger() {
	try {
		const errorReporting = getErrorReportingTransport();

		const logger = winston.createLogger({
			level: "info",
			transports: getLoggingTransports(),
		});

		return {
			debug: async (message: string, meta?: JSObject) => {
				const [error] = await tryCatch(Promise.resolve(logger.debug(message, meta)));
				if (error) console.error("Debug logging failed:", error.message);
			},
			error: async (message: string, error?: AppError) => {
				const object = error?.toObject() ?? { message };

				// Remove `message` property to avoid double-printing in some logging transports
				const sanitizedObject = (() => {
					const { message: _, ...rest } = object;
					return rest;
				})();

				const [loggingError] = await tryCatch(Promise.resolve(logger.error(message, sanitizedObject)));
				if (loggingError) console.error("Logging failed:", loggingError.message);

				if (errorReporting) {
					const [reportingError] = await tryCatch(Promise.resolve(errorReporting.report(object)));
					if (reportingError) console.error("Error reporting failed:", reportingError.message);
				}
			},
			info: async (message: string, meta?: JSObject) => {
				const [error] = await tryCatch(Promise.resolve(logger.info(message, meta)));
				if (error) console.error("Info logging failed:", error.message);
			},
		};
	} catch (error) {
		console.error("Failed to initialize logger:", error);
	}
}
