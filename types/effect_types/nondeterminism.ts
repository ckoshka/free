export type TimeEffect<T> = {
	now: () => T;
};

export type RandomEffect<Min extends number, Max extends number> = {
	random: () => number;
};