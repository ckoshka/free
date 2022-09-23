export type StoreEffect<K, V> = {
	get: (key: K) => V | undefined; // should be a Maybe
	set: (key: K, val: V) => V;
};

//keys: () => K[];
//values: () => V[];
//entries: () => [K, V][];

export type GlobalEventListener<FnName extends string> = Record<
	FnName,
	(cb: () => void | Promise<void>) => void | Promise<void>
>;

export type NoEffect = Record<never, never>;

export type ReadFileEffect<T> = {
	readFile: (path: string) => T; // should be a Maybe
};

export type FileWriterEffect = {
	writeFile: (
		{ path, data }: { path: string; data: Uint8Array },
	) => Promise<void>;
};

export type ReadEffect<Name extends string, T> = Record<
	Name,
	() => Readonly<T>
>;

export type UpdateEffect<T> = {
	update: (a0: T) => void | Promise<void>;
};

// deno-lint-ignore no-explicit-any
export type MutableEffect<T extends Record<string, any>> = {
	write: <K extends keyof T>(key: K, fn: (a0: T[K]) => T[K]) => Promise<void>;
};

export type TapEffect = {
	tap: (additionalMsg?: string) => <T>(data: T) => T;
};

export type ShellEffect<T> = {
	run: (cmd: string, env: Record<string, string>) => Promise<T> | T;
};

export type SqliteEffect = {
	execute: (cmd: string, data?: (string | number)[]) => Promise<void>;
	query: (cmd: string) => AsyncIterableIterator<string>;
};

export type TimeEffect<T> = {
	now: () => T;
};

export type NetEffect<T> = {
	fetch: (url: string) => T;
};

export type InterpreterEffect<InputType, OutputType> = {
	interpret: (a0: InputType) => OutputType;
};

export type RandomEffect<Min extends number, Max extends number> = {
	random: () => number;
};

export type LoggerEffect = {
	// deno-lint-ignore no-explicit-any
	log: (...data: any[]) => void | Promise<void>;
};

export type ExecuteYieldEffect = {
	yieldFrom: <T>(tasks: (() => Promise<T>)[]) => AsyncIterable<T>;
};

export type ExecuteAtOnceEffect = {
	enqueue: <T>(tasks: (() => Promise<T>)[]) => Promise<T[]>;
};

export type IOEffect<T> = {
	effect: (a0: T) => void | Promise<void>;
};

export type UserInputEffect<ReturnType> = {
	ask: (q?: string) => ReturnType;
};

export type ThrowEffect<E> = {
	throw: (err: E) => never;
};

export type ParserEffect<T> = {
	parse: (s: string) => T;
};

export type ExitEffect = {
	exit: () => never | Promise<never>;
};

export type CleanupEffect<T> = {
	cleanup: (a0: T) => void | Promise<void>;
};
