import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { HomeScreen } from './screens/home';

export function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index path="/" element={<HomeScreen />} />

				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</BrowserRouter>
	);
}
