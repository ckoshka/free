export type ParserEffect<T> = {
	parse: (s: string) => T;
};

export type InterpreterEffect<InputType, OutputType> = {
	interpret: (a0: InputType) => OutputType;
};