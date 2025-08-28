import { useReducer } from "react";
import { isNullish } from "@/lib/utils";

export function useArray<T>(defaultValue: T[] = [], equal = (a: T, b: T) => a === b) {
	return useReducer<T[], [T]>((s, v) => {
		if (isNullish(v)) return s;
		if (s.includes(v)) return s.filter((item) => !equal(item, v));
		return [...s, v];
	}, defaultValue);
}
