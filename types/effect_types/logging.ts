export type LoggerEffect = {
	// deno-lint-ignore no-explicit-any
	log: (...data: any[]) => void;
};

export type TapEffect = {
	tap: (additionalMsg?: string) => <T>(data: T) => T;
};