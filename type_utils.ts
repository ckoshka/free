// deno-lint-ignore-file no-explicit-any
import { Free } from "./free.ts";

export type effectsOf<F extends Free<any, any, any>> = F extends Free<unknown, infer Effs, any> ? Effs : never;