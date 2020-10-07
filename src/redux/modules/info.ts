import { postRequestConcatExportASYNC } from '../../utils/mockAPI';

const LOAD = 'redux-example/info/LOAD';
const LOAD_SUCCESS = 'redux-example/info/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/info/LOAD_FAIL';

export type Actions = { type: typeof LOAD } | { type: typeof LOAD_SUCCESS } | { type: typeof LOAD_FAIL };

export type State = {
	loading: boolean;
	loaded: boolean;
	error: true | null;
	errorResponse: any;
	data: any;
};

export const initialState = {
	loading: false,
	loaded: false,
	error: null,
	errorResponse: null,
	data: null,
};

export const reducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		case LOAD:
			console.log('>>>>>>>>>>>>>>>> INFO > LOAD > REDUCER > state: ', state);
			console.log('>>>>>>>>>>>>>>>> INFO > LOAD > REDUCER > action: ', action);
			return {
				...state,
				loading: true,
			};

		case LOAD_SUCCESS:
			console.log('>>>>>>>>>>>>>>>> INFO > LOAD_SUCCESS > REDUCER > state: ', state);
			console.log('>>>>>>>>>>>>>>>> INFO > LOAD_SUCCESS > REDUCER > action: ', action);
			return {
				...state,
				loading: false,
				loaded: true,
				data: action,
			};

		case LOAD_FAIL:
			console.log('>>>>>>>>>>>>>>>> INFO > LOAD_FAIL > REDUCER > state: ', state);
			console.log('>>>>>>>>>>>>>>>> INFO > LOAD_FAIL > REDUCER > action: ', action);
			return {
				...state,
				loading: false,
				loaded: false,
				// error: action.error,
				error: true,
				errorResponse: { message: action, documentation_url: '' },
			};

		default:
			return state;
	}
};

export function isInfoLoaded(storeState: any): any {
	return storeState.info && storeState.info.loaded;
}

export function loadInfo(): any {
	console.log('>>>>>>>>>>>>>>>> REDUX > INFO > loadInfo() +++++++++++++++++++++++++++');
	// let location = 'https://api.github.com/feeds';
	// let location = 'https://www.metaweather.com/api/location/2459115/';
	return {
		types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
		promise: () =>
			postRequestConcatExportASYNC('resolve', true, 550).then((result) => {
				console.log('>>>>>>>>>>>>>>>> INFO > loadInfo() > THEN > RESULT: ', result);
				return result;
			}),
	};
}
