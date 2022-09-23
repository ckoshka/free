import { Free } from "./free.ts";

// deno-lint-ignore no-explicit-any
export type effectsOf<F extends Free<any, any, any>> = F extends Free<unknown, infer Effs, any> ? Effs : never;