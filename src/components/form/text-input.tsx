import type { AnyFieldApi } from "@tanstack/react-form";
import { Eye, EyeOff } from "lucide-react";
import type { ComponentProps } from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FieldInfo } from "./field-info";

interface Props extends ComponentProps<typeof Input> {
	field: AnyFieldApi;
	label?: string;
	required?: boolean;
	showPasswordToggle?: boolean;
}

export function TextInput({ field, label, placeholder, type = "text", className, required = false, ...props }: Props) {
	const [showPassword, setShowPassword] = useState(false);

	const isPasswordType = type === "password";
	const inputType = isPasswordType && showPassword ? "text" : type;

	const togglePasswordVisibility = () => setShowPassword(!showPassword);

	return (
		<div className="grid gap-3">
			<Label htmlFor={field.name}>
				{label}
				{required && <span className="text-red-500 ml-1">*</span>}
			</Label>
			<div className="relative">
				<Input
					className={cn(
						field.state.meta.isTouched && !field.state.meta.isValid && "border-red-500",
						isPasswordType && "pr-10",
						className,
					)}
					id={field.name}
					name={field.name}
					onBlur={field.handleBlur}
					onChange={(e) => field.handleChange(e.target.value)}
					placeholder={placeholder}
					type={inputType}
					value={field.state.value}
					{...props}
				/>
				{isPasswordType && (
					<Button
						aria-label={showPassword ? "Hide password" : "Show password"}
						className="absolute inset-0 left-auto px-3 hover:bg-transparent h-auto"
						onClick={togglePasswordVisibility}
						size="sm"
						type="button"
						variant="ghost"
					>
						{showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
					</Button>
				)}
			</div>
			<FieldInfo field={field} />
		</div>
	);
}
