import { Free } from "./free.ts";
import { FnRecord } from "./types/internal_type_utils.ts";

export const use = <T extends FnRecord = Record<never, never>>() => Free.new<T>();
