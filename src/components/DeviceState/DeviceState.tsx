import React from 'react';
import { useSelector } from 'react-redux';
import * as Styles from './styles';

export type DeviceStateState = {
	online: any;
	userAgent: any;
	isBot: any;
};

export const DeviceState: React.FC = () => {
	const online = useSelector((state: DeviceStateState) => state.online);
	const userAgent = useSelector((state: DeviceStateState) => state.userAgent);
	const isBot = useSelector((state: DeviceStateState) => state.isBot);

	console.log('>>>>>>>>>>>>>>>>>>>>>>>> DeviceState > online    ????: ', online);
	console.log('>>>>>>>>>>>>>>>>>>>>>>>> DeviceState > userAgent ????: ', userAgent);
	console.log('>>>>>>>>>>>>>>>>>>>>>>>> DeviceState > isBot     ????: ', isBot);

	return (
		<div className="container">
			<div className="flex-column-center mb-5">
				<Styles.DeviceStateStyled className="flex-column-center">
					<Styles.StoreStateOnline>{`'online' store state is ${online} !`}</Styles.StoreStateOnline>

					<Styles.StoreStateUserAgent>{`device 'userAgent' store state is ${userAgent} !`}</Styles.StoreStateUserAgent>

					<Styles.StoreStateIsBot>{`device 'bot' store state is ${isBot} !`}</Styles.StoreStateIsBot>

					<Styles.StoreStateBlurb>DeviceStateStyled!</Styles.StoreStateBlurb>
				</Styles.DeviceStateStyled>
			</div>
		</div>
	);
};
