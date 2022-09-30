export type ExecuteYieldEffect = {
	yieldFrom: <T>(tasks: (() => Promise<T>)[]) => AsyncIterable<T>;
};

export type ExecuteAtOnceEffect = {
	enqueue: <T>(tasks: (() => Promise<T>)[]) => Promise<T[]>;
};