export type GlobalEventListener<FnName extends string> = Record<
	FnName,
	(cb: () => void | Promise<void>) => void
>;