const LOAD = 'redux-example/infoAlert/LOAD';
const LOAD_SUCCESS = 'redux-example/infoAlert/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/infoAlert/LOAD_FAIL';

import { postRequestConcatExportASYNC } from '../../utils/mockAPI';

//  export type State = {
//  	loading: boolean;
//  	loaded: boolean,
//  	error: true | null;
//  	errorResponse: any;
//  	data: any;
//  };

export const initialState = {
	loading: false,
	loaded: false,
	error: null,
	errorResponse: null,
	data: null,
};

export const reducer = (state = initialState, action = {}) => {
	switch (action.type) {

		case LOAD:
			console.log('>>>>>>>>>>>>>>>> INFOALERT > LOAD > REDUCER > state: ', state);
			console.log('>>>>>>>>>>>>>>>> INFOALERT > LOAD > REDUCER > action: ', action);
			return {
				...state,
				loading: true,
			};

		case LOAD_SUCCESS:
			console.log('>>>>>>>>>>>>>>>> INFOALERT > LOAD_SUCCESS > REDUCER > state: ', state);
			console.log('>>>>>>>>>>>>>>>> INFOALERT > LOAD_SUCCESS > REDUCER > action: ', action);
			return {
				...state,
				loading: false,
				loaded: true,
				data: action.result,
			};

		case LOAD_FAIL:
			console.log('>>>>>>>>>>>>>>>> INFOALERT > LOAD_FAIL > REDUCER > state: ', state);
			console.log('>>>>>>>>>>>>>>>> INFOALERT > LOAD_FAIL > REDUCER > action: ', action);
			return {
				...state,
				loading: false,
				loaded: false,
				// error: action.error,
				error: true,
				errorResponse: {message: action.error.message, documentation_url:''},
			};

		default:
			return state;
	}
}

export function isLoaded(globalState) {
	return globalState.infoAlert && globalState.infoAlert.loaded;
}

export function load() {
	console.log('>>>>>>>>>>>>>>>> INFOALERT > load() +++++++++++++++++++++++++++');
	// let location = 'https://api.github.com/feeds';
	let location = 'https://www.metaweather.com/api/location/2459115/';
	return {
		types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
		promise: () => postRequestConcatExportASYNC('resolve', true, 550)
			.then(
				result => {
					console.log('>>>>>>>>>>>>>>>> INFOALERT > load() > THEN > RESULT: ', result);
					return result;
				}, 
			)
	};
};
