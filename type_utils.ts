// deno-lint-ignore-file no-explicit-any
import { Free } from "./free.ts";

export type effectsOf<F extends Free<any, any, any>> = F extends Free<unknown, infer Effs, any> ? Effs : never;


export type AnyAsyncFn = (...args: any[]) => Promise<any>;
export type FnRecord = Record<string, any>;
export type OptionalPromise<T> = Promise<T> | T;

export type ExcludeProps<A extends FnRecord, B extends Partial<A>> = {
	[K in keyof A]: B[K] extends A[K] ? never : A[K];
};