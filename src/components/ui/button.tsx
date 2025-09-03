import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";
import type { ComponentProps, ComponentType } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
	{
		defaultVariants: {
			isLoading: false,
			size: "default",
			variant: "default",
		},
		variants: {
			isLoading: {
				false: "",
				true: "opacity-70 cursor-not-allowed",
			},
			size: {
				default: "h-9 px-4 py-2 has-[>svg]:px-3",
				icon: "size-9",
				lg: "h-10 rounded-md px-6 has-[>svg]:px-4 [&_svg:not([class*='size-'])]:!size-6",
				sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 [&_svg:not([class*='size-'])]:!size-4",
			},
			variant: {
				default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
				destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20",
				ghost: "hover:bg-accent hover:text-accent-foreground",
				link: "text-primary underline-offset-4 hover:underline",
				outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
				secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
			},
		},
	},
);

type IsLoadingVariant = VariantProps<typeof buttonVariants>["isLoading"];
type ButtonVariantsProps = OverrideObject<VariantProps<typeof buttonVariants>, { isLoading?: NonNullable<IsLoadingVariant> }>;

interface Props extends ComponentProps<"button">, ButtonVariantsProps {
	asChild?: boolean;
	Icon?: ComponentType<ClassNameProps>;
}

function Button({
	className,
	variant,
	size,
	Icon,
	asChild = false,
	isLoading = false,
	disabled = false,
	children,
	type = "button",
	...props
}: Props) {
	const Comp = asChild ? Slot : "button";

	return (
		<Comp
			className={cn(buttonVariants({ className, isLoading, size, variant }))}
			data-slot="button"
			disabled={disabled || isLoading}
			type={type}
			{...props}
		>
			{isLoading && <LoaderCircle className="animate-spin size-4" />}
			{!isLoading && Icon && <Icon />}
			{!isLoading && children}
		</Comp>
	);
}

export { Button, buttonVariants };
