import type { ComponentProps, FormEvent } from "react";

interface FormProps extends ComponentProps<"form"> {
	handleSubmit: () => void;
}

export function Form({ handleSubmit, ...props }: FormProps) {
	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		e.stopPropagation();
		handleSubmit();
	};

	return <form onSubmit={onSubmit} {...props} />;
}
