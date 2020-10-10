import { isInfoAlertThreeLoaded, loadInfoAlertThree } from '../../redux/modules/infoAlertThree';

async function preloadData(store, getState) {
	// console.log('>>>>>>>>>>>>>>>> About > preloadData > isInfoAlertThreeLoaded?: ', isInfoAlertThreeLoaded(store.getState().infoAlertThree))
	if (!isInfoAlertThreeLoaded(store.getState().infoAlertThree)) {
		await store.dispatch(loadInfoAlertThree());
	}
}

export { preloadData };
