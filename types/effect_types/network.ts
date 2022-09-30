export type NetEffect<T> = {
	fetch: (url: string) => T;
};