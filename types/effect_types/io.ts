export type UserInputEffect<ReturnType> = {
	ask: (q?: string) => ReturnType;
};