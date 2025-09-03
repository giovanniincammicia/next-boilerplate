/** biome-ignore-all lint/correctness/noUnusedVariables: Declaration types are available globally without import */

// React specific types
interface ClassNameProps {
	className?: string;
}
type SetFunction<T> = React.Dispatch<React.SetStateAction<T>>;
type SimpleSetFunction<T> = React.Dispatch<T>;
type State<T> = [T, SetFunction<T>];

// Next specific types
interface NextError extends Error {
	digest?: string;
}

interface AppErrorProps {
	error: NextError;
	reset: EmptyFunction;
}

// Utility types
type EmptyFunction = () => void;
type JSObject = Record<PropertyKey, unknown>;
type RealEmptyObject = Record<never, never>;
type EmptyObject = { __empty: true };
type Values<T> = T[keyof T];
type Keys<T> = keyof T;
type NonNull<T> = T extends null ? never : T;
type NonNullProperties<T> = {
	[K in keyof T]: NonNull<T[K]>;
};
type OptionalProperties<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// This type is used to override the props of a component
// e.g.
// type MyInputProps = OverrideObject<MyComponentProps, { onChange: () => void }>;
// is equal to
// type MyInputProps = Omit<MyComponentProps, 'onChange'> & { onChange: () => void };
type OverrideObject<T, Overridden> = Omit<T, keyof Overridden> & Overridden;

// This type is used to make a type more readable
type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};
