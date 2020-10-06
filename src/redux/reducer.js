import device from './modules/device';
import { reducer as info} from './modules/info';
import { reducer as infoAlert} from './modules/infoAlert';
import { reducer as infoAlertThree} from './modules/infoAlertThree';
import toggleTheme from './modules/toggleTheme';


export default function rootReducer() {
	return {
		online: (v = true) => v,
    device,
		info,
		infoAlert,
		infoAlertThree,
		toggleTheme,
	};
}
