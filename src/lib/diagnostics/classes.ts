import type z from "zod";
import { ERROR_CODES, type ErrorCode, type ErrorReport } from "./validation";

export class AppError extends Error {
	public readonly code: ErrorCode;
	public readonly component: ErrorReport["component"];
	public readonly correlationId: ErrorReport["correlationId"];
	public readonly digest: ErrorReport["digest"];
	public readonly metadata: ErrorReport["metadata"];
	public readonly url: ErrorReport["url"];
	public readonly userAgent: ErrorReport["userAgent"];
	public readonly userId: ErrorReport["userId"];
	public readonly clientMessage?: string;
	public readonly status: number;

	constructor(data: ErrorReport & { code: ErrorCode }) {
		super(data.message);
		this.name = this.constructor.name;
		this.code = data.code;
		this.component = data.component;
		this.correlationId = data.correlationId;
		this.digest = data.digest;
		this.metadata = data.metadata;
		this.url = data.url;
		this.userAgent = data.userAgent;
		this.userId = data.userId;
		this.clientMessage = data.clientMessage ?? "Server Error";
		this.status = data.status ?? 500;
	}

	toObject() {
		return {
			code: this.code,
			component: this.component,
			correlationId: this.correlationId,
			digest: this.digest,
			message: this.message,
			metadata: this.metadata,
			name: this.name,
			status: this.status,
			url: this.url,
			userAgent: this.userAgent,
			userId: this.userId,
		};
	}

	extend(baseError: Partial<ErrorReport>) {
		return Object.assign(this, baseError);
	}
}

type ValidationErrorParams = OverrideObject<Omit<ErrorReport, "message">, { issues: z.core.$ZodIssue[] }>;
export class ValidationError extends AppError {
	constructor({ issues, ...data }: ValidationErrorParams) {
		const formattedIssues = issues.map(({ message, path }) => `${message}. Path: ${path.join(".")}`).slice(0, 10);
		super({
			...data,
			code: ERROR_CODES.VALIDATION_ERROR,
			message: "Validation Error",
			metadata: { ...data.metadata, issues: formattedIssues },
		});
	}
}

export class AuthError extends AppError {
	constructor(data: ErrorReport) {
		super({ ...data, code: ERROR_CODES.AUTH_ERROR });
	}
}

export class ClientError extends AppError {
	constructor(data: ErrorReport) {
		super({ ...data, code: ERROR_CODES.CLIENT_ERROR });
	}
}

export class ServerError extends AppError {
	constructor(data: ErrorReport) {
		super({ ...data, code: ERROR_CODES.SERVER_ERROR });
	}
}

export class DatabaseError extends AppError {
	constructor(data: ErrorReport) {
		super({ ...data, code: ERROR_CODES.DATABASE_ERROR });
	}
}

export class ExternalServiceError extends AppError {
	constructor(data: ErrorReport) {
		super({ ...data, code: ERROR_CODES.EXTERNAL_SERVICE_ERROR });
	}
}

export class GenericError extends AppError {
	constructor(data: ErrorReport) {
		super({ ...data, code: ERROR_CODES.GENERIC_ERROR });
	}
}
