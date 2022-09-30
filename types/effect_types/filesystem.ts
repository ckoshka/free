export type ReadFileEffect<T> = {
	readFile: (path: string) => T; // should be a Maybe
};

export type WriteFileEffect = {
	writeFile: (path: string, data: Uint8Array) => void;
};
