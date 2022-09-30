export type SqliteEffect = {
	execute: (cmd: string, data?: (string | number)[]) => Promise<void>;
	query: (cmd: string) => AsyncIterableIterator<string>;
};

export type StoreEffect<K, V> = {
	get: (key: K) => V | undefined; // should be a Maybe
	set: (key: K, val: V) => V;
};