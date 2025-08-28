import type { AnyFieldApi } from "@tanstack/react-form";
import { TypographyError, TypographyMuted } from "../ui/typography";

export function FieldInfo({ field }: { field: AnyFieldApi }) {
	const { isTouched, isValid, isValidating, errors } = field.state.meta;
	const errorMessages = errors.map(({ message }) => message).join(", ");
	return (
		<>
			{isTouched && !isValid && <TypographyError>{errorMessages}</TypographyError>}
			{isValidating && <TypographyMuted>Validating...</TypographyMuted>}
		</>
	);
}
