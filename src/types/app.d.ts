// These are React specific types
interface ClassNameProps {
	className?: string;
}
type SetFunction<T> = React.Dispatch<React.SetStateAction<T>>;
type State<T> = [T, SetFunction<T>];

// These are utility types
type EmptyFunction = () => void;
type EmptyObject = Record<never, never>;
type Values<T> = T[keyof T];
type Keys<T> = keyof T;
// This type is used to override the props of a component
// e.g.
// type MyInputProps = OverrideObject<MyComponentProps, { onChange: () => void }>;
// is equal to
// type MyInputProps = Omit<MyComponentProps, 'onChange'> & { onChange: () => void };
type OverrideObject<T, Overridden> = Omit<T, keyof Overridden> & Overridden;

// These types are used to define the props of a Next Page server component
type Props = Record<string, unknown>; // This is the type your defined props will extend
type URLValue = string | string[] | undefined;
type URLValueObject = Record<string, URLValue>;
interface AppPageProps<
	T extends Props = EmptyObject,
	Params extends URLValueObject = undefined,
	SearchParams extends URLValueObject = undefined,
> extends T {
	params: Params;
	searchParams: SearchParams;
}
