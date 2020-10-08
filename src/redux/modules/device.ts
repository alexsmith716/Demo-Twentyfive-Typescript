export type State = {
	userAgent: any;
	isBot: any;
};

export const initialState = {
	userAgent: null,
	isBot: null,
};

export const reducer = (state: State = initialState): State => {
	return state;
};
