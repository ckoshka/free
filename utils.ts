import { Free } from "./free.ts";

export const use = <T = Record<never, never>>() => Free.new<T>();
