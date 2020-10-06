import React from 'react';
import { renderRoutes, RouteConfig } from 'react-router-config';

import { NavBar } from '../../components/NavBar';
import { DeviceState } from '../../components/DeviceState';
import { InfoBar } from '../../components/InfoBar';
import Footer from '../../components/Footer';

export type AppProps = {
	route: {
		routes: RouteConfig[];
	};
};

export const App = ({ route }: AppProps) => {
	return (
		<>
			{/* ------------- Navbar ------------- */}
			<NavBar />
			{/* ------------- Main Content ------------- */}
			{renderRoutes(route.routes)}
			{/* --------------- InfoBar ---------------- */}
			<InfoBar />
			{/* ------------- Device State ----------- */}
			<DeviceState />
			{/* --------------- Footer ----------------- */}
			<Footer />
			{/* --------------- Modals ----------------- */}
		</>
	);
};
