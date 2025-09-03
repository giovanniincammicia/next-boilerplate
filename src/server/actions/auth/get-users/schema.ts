import z from "zod";

export const schema = z.object({
	filters: z.object({
		name: z.string().min(2).max(100).optional(),
	}),
});
export type Input = z.infer<typeof schema>;
