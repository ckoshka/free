export type UpdateEffect<T> = {
	update: (a0: T) => void | void;
};

export type ReadEffect<Name extends string, T> = Record<
	Name,
	() => Readonly<T>
>;

export type MutableEffect<T extends Record<string, unknown>> = {
	write: <K extends keyof T>(key: K, fn: (a0: T[K]) => T[K]) => void;
};

export type CleanupEffect<T> = {
	cleanup: (a0: T) => void;
};
