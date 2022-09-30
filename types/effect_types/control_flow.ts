export type ThrowEffect<E> = {
	throw: (err: E) => never;
};

export type ExitEffect = {
	exit: () => never;
};