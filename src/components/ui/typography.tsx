import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const TypographyH1 = ({ className, ...props }: ComponentProps<"h1">) => (
	<h1 className={cn("scroll-m-20 text-3xl font-extrabold tracking-tight text-balance", className)} {...props} />
);

export const TypographyH2 = ({ className, ...props }: ComponentProps<"h2">) => (
	<h2 className={cn("scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0", className)} {...props} />
);

export const TypographyH3 = ({ className, ...props }: ComponentProps<"h3">) => (
	<h3 className={cn("scroll-m-20 text-xl font-semibold tracking-tight", className)} {...props} />
);

export const TypographyH4 = ({ className, ...props }: ComponentProps<"h4">) => (
	<h4 className={cn("scroll-m-20 text-lg font-semibold tracking-tight", className)} {...props} />
);

export const TypographyP = ({ className, ...props }: ComponentProps<"p">) => (
	<p className={cn("leading-relaxed", className)} {...props} />
);

export const TypographyBlockquote = ({ className, ...props }: ComponentProps<"blockquote">) => (
	<blockquote className={cn("mt-6 border-l-2 pl-6 italic", className)} {...props} />
);

export const TypographyLarge = ({ className, ...props }: ComponentProps<"div">) => (
	<div className={cn("text-lg font-semibold leading-relaxed", className)} {...props} />
);

export const TypographySmall = ({ className, ...props }: ComponentProps<"small">) => (
	<small className={cn("text-sm leading-relaxed", className)} {...props} />
);

export const TypographyMuted = ({ className, ...props }: ComponentProps<"p">) => (
	<span className={cn("text-muted-foreground", className)} {...props} />
);

export const TypographyError = ({ className, ...props }: ComponentProps<"p">) => (
	<span className={cn("text-red-500 font-medium text-sm", className)} {...props} />
);

export const TypographyStrong = ({ className, ...props }: ComponentProps<"p">) => (
	<strong className={cn("font-medium", className)} {...props} />
);
export const TypographyList = ({ className, ...props }: ComponentProps<"ul">) => (
	<ul className={cn("my-2 ml-6 list-disc [&>li]:mt-2", className)} {...props} />
);
export const TypographyListItem = (props: ComponentProps<"li">) => <li {...props} />;
