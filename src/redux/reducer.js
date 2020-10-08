import { reducer as device } from './modules/device';
import { reducer as info } from './modules/info';
import { reducer as infoAlert } from './modules/infoAlert';
import { reducer as infoAlertThree } from './modules/infoAlertThree';
import { reducer as theme } from './modules/theme';


export default function rootReducer() {
	return {
		online: (v = true) => v,
    device,
		info,
		infoAlert,
		infoAlertThree,
		theme,
	};
}
