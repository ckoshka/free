// deno-lint-ignore-file no-explicit-any
import { Free } from "../free.ts";

export type EffectsOf<F extends Free<any, any, any>> = F extends
	Free<unknown, infer Effs, any> ? Effs : never;

// type op that takes a module, extracts a specific key from it? (i.e deno)

// this type needs to depromisify

type Unnested<T> = T extends Promise<infer K> ? K : T;

export type Async<T extends Record<string, (...args: any[]) => any>> = {
	[K in keyof T]: (
		...args: Parameters<T[K]>
	) => Promise<Unnested<ReturnType<T[K]>>>;
};

export type Rename<
	T extends Record<string, any>,
	OriginalName extends keyof T,
	NewName extends string,
> = Omit<
	{
		[K in keyof T | NewName]: K extends OriginalName ? never
			: K extends NewName ? T[OriginalName]
			: T[K];
	},
	OriginalName
>;

// means we can convert everything into a sync only function then export Asyncify if need be