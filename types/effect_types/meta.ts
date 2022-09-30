export type NoEffect = Record<never, never>;

export type IOEffect<T> = {
	effect: (a0: T) => void;
};