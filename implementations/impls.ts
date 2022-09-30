import {
	ExitEffect,
	LoggerEffect,
	RandomEffect,
	ReadFileEffect,
	TapEffect,
	TimeEffect,
	WriteFileEffect,
} from "../types/effect_types/mod.ts";

export const implTap = ({ debug }: { debug: boolean }) =>
	(): TapEffect => ({
		tap: (msg) => (a0) => debug ? (console.log(msg, a0), a0) : a0,
	});

export const implTime = () =>
	<TimeEffect<number>> {
		now: () => new Date().getTime(),
	};

export const implExit = () =>
	<ExitEffect> {
		exit: () => Deno.exit(1),
	};

export const implLog = () =>
	<LoggerEffect> {
		log: (args) => console.log(args),
	};

export const implRandom = () =>
	<RandomEffect<0, 1>> {
		random: () => Math.random(),
	};

export const implReadFile = () =>
	<ReadFileEffect<Promise<Uint8Array>>> {
		readFile: (path: string) => Deno.readFile(path),
	};

export const implWriteFile = () =>
	<WriteFileEffect> {
		writeFile: (path: string, data: Uint8Array) => Deno.writeFile(path, data),
	};