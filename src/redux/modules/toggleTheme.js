const TOGGLE_THEME_DEFAULT = 'redux-example/toggleTheme/TOGGLE_THEME_DEFAULT';
const TOGGLE_THEME_DARK = 'redux-example/toggleTheme/TOGGLE_THEME_DARK';

import { AppTheme } from '../../styled';


const initialState = {
	theme: AppTheme.theme.defaultTheme
};

export default function reducer(state = initialState, action = {}) {

	// console.log('>>>> toggleTheme > reducer > state.theme: ', state.theme);

	switch (action.type) {

		case TOGGLE_THEME_DEFAULT:
			return {
				theme: AppTheme.theme.defaultTheme
			};

		case TOGGLE_THEME_DARK:
			return {
				theme: AppTheme.theme.darkTheme
			};

		default:
			return state
	}
}

export function toggleTheme(themeType) {
	const t = themeType === 'default' ? TOGGLE_THEME_DARK : TOGGLE_THEME_DEFAULT;
	return {
		type: t
	};
}
