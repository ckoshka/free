import { ExitEffect, LoggerEffect, RandomEffect, TapEffect, TimeEffect } from "./effect_types.ts";

export const implTap = ({ debug }: { debug: boolean }) =>
	(): TapEffect => ({
		tap: (msg) => (a0) => debug ? (console.log(msg, a0), a0) : a0,
	});

export const implTime = () =>
	<TimeEffect<number>> {
		now: () => new Date().getTime(),
	};

export const implExit = () => <ExitEffect> {
    exit: () => Deno.exit(1)
}

export const implLog = () => <LoggerEffect> {
    log: (args) => console.log(args)
}

export const implRandom = () => <RandomEffect<0, 1>> {
    random: () => Math.random()
}