import { useReducer } from "react";
import { isNullish } from "@/lib/utils";

/**
 * Custom React hook for managing an array state with toggle functionality.
 *
 * @param defaultValue - The initial value of the array.
 * @param equal - Function to determine equality between array elements.
 * @returns - Returns the current array and a dispatch function to toggle elements.
 *
 * @remarks
 * - When the dispatch function is called with a value:
 *   - If the value is nullish, the array remains unchanged.
 *   - If the value exists in the array (based on the `equal` function), it is removed.
 *   - If the value does not exist, it is added to the array.
 *
 * @example
 * ```tsx
 * const [selectedItems, toggleItem] = useArray([1, 2]);
 * toggleItem(2); // Removes 2 from the array
 * toggleItem(3); // Adds 3 to the array
 * ```
 */
export function useArray<T>(defaultValue: T[] = [], equal = (a: T, b: T) => a === b) {
	return useReducer<T[], [T]>((s, v) => {
		if (isNullish(v)) return s;
		if (s.some((item) => equal(item, v))) return s.filter((item) => !equal(item, v));
		return [...s, v];
	}, defaultValue);
}
