import { isInfoLoaded, loadInfo } from '../../redux/modules/info';
import { isInfoAlertLoaded, loadInfoAlert } from '../../redux/modules/infoAlert';

async function preloadData(store, getState) {
	console.log('>>>>>>>>>>>>>>>> APP > preloadData > isInfoLoaded?: ', isInfoLoaded(store.getState().info));
	if (!isInfoLoaded(store.getState().info)) {
		await store.dispatch(loadInfo());
	};

	console.log('>>>>>>>>>>>>>>>> APP > preloadData > isInfoAlertLoaded?: ', isInfoAlertLoaded(store.getState().infoAlert));
	if (!isInfoAlertLoaded(store.getState().infoAlert)) {
		await store.dispatch(loadInfoAlert());
	}
};

export { preloadData };
