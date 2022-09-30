export type ShellEffect<T> = {
	run: (cmd: string, env: Record<string, string>) => T;
};