// deno-lint-ignore-file no-explicit-any
type AnyAsyncFn = (...args: any[]) => Promise<any>;
export type FnRecord = Record<string, any>;
type OptionalPromise<T> = Promise<T> | T;

type ExcludeProps<A extends FnRecord, B extends Partial<A>> = {
	[K in keyof A]: B[K] extends A[K] ? never : A[K];
};

export class Free<
	T,
	Effects extends FnRecord = Record<never, never>,
	DerivedEffects extends FnRecord = Record<never, never>,
> {

	constructor(
		private fns: [
			...AnyAsyncFn[],
			(a0: any, effs: DerivedEffects & Effects) => Promise<T>,
		],
		private derivation: (a0: Effects) => DerivedEffects,
	) {}

	of<B>(data: B) {
		return new Free<B, Effects, DerivedEffects>([
			...this.fns,
			() => Promise.resolve(data),
		], this.derivation);
	}

	static lift<B, Effs>(data: B) {
		return new Free<B, Effs>([
			() => Promise.resolve(data),
		], (a) => a);
	}

	static new<Effs extends FnRecord>() {
		return new Free<null, Effs, Record<never, never>>([
			() => Promise.resolve(null),
		], (a) => a);
	}

	map<B>(fn: (a0: T, effs: Effects & DerivedEffects) => B | Promise<B>) {
		return new Free<B, Effects, DerivedEffects>([
			...this.fns,
			(a0: T, effs: Effects & DerivedEffects) =>
				Promise.resolve(fn(a0, effs)),
		], this.derivation);
	}
    
	static reader<InputsType extends Record<string, any>, ReturnType>(
		fn: (inputs: InputsType) => ReturnType | Promise<ReturnType>,
	) {
		return new Free<ReturnType, InputsType>([
			(_: null, effs: InputsType) => Promise.resolve(fn(effs)),
		], (a) => a);
	}

	map2<B>(fn: (effs: Effects & DerivedEffects) => B | Promise<B>) {
		return this.map<B>((_: T, effs: Effects & DerivedEffects) =>
			Promise.resolve(fn(effs))
		);
	}

	extendF<NewEffs extends FnRecord>(
		fn: (a0: Effects & DerivedEffects) => NewEffs,
	) {
		return new Free<T, Effects, DerivedEffects & NewEffs>([
			...this.fns,
		], (a) => ({
			...this.derivation(a),
			...fn({ ...this.derivation(a), ...a }),
		}));
	}

	implF<ImplEffects extends FnRecord & Partial<Effects>>(
		fn: (a0: Effects & DerivedEffects) => ImplEffects,
	) {
		return new Free<
			T,
			ExcludeProps<Effects, ImplEffects>,
			DerivedEffects & ImplEffects
		>([
			...this.fns,
		], (a) => ({
			...this.derivation(a),
			...fn({ ...a, ...this.derivation(a) }),
		}));
	}


	run(impl: Omit<Effects, keyof DerivedEffects>): Promise<T> {
		const joinedImpl = { ...impl, ...this.derivation(impl as any) };
		return this.fns.reduce(
			(prevResult, nextFn) =>
				prevResult.then((res) => nextFn(res, joinedImpl as any)),
			Promise.resolve(null),
		) as any;
	}

	chain<
		B,
		Effs2 extends FnRecord,
		DerivedEffects2 extends FnRecord,
	>(
		fn: (
			a0: T,
			effs: Effects & DerivedEffects,
		) => OptionalPromise<Free<B, Effs2, DerivedEffects2>>,
	): Free<B, Effs2 & Effects, DerivedEffects> {
		return new Free<B, Effs2 & Effects, DerivedEffects>([
			...this.fns,
			(a0: T, effs: Effs2 & Effects & DerivedEffects) =>
				Promise.resolve(fn(a0, { ...effs, ...this.derivation(effs) })),
			(a0: Free<B, Effs2, DerivedEffects2>, effs: Effs2 & Effects) =>
				a0.run({ ...effs, ...this.derivation(effs) }), // it contains its own derivation, so we don't need to know how it gets transformed?
		], this.derivation);
	}
	static flatten<
		B,
		Effs extends FnRecord,
	>(
		frees: OptionalPromise<Free<B, Effs, FnRecord>>[],
	) {
		return new Free<B[], Effs>(
			[
				async (_: null, effs: Effs) => {
					const results: B[] = [];
					for (const free of frees) {
						await (await Promise.resolve(free)).run({ ...effs })
							.then((r) => results.push(r));
					}
					return results;
				},
			],
			(a) => a,
		);
	}
}

