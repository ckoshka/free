
export type AnyAsyncFn = (...args: any[]) => Promise<any>;
export type FnRecord = Record<string, any>;
export type OptionalPromise<T> = Promise<T> | T;

export type ExcludeProps<A extends FnRecord, B extends Partial<A>> = {
	[K in keyof A]: B[K] extends A[K] ? never : A[K];
};