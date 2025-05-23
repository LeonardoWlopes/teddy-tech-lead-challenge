import { Suspense, lazy } from 'react';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router';
import { useAuthStore } from './stores/auth';
import { useShallow } from 'zustand/shallow';
import { LoadingScreen } from './screens/loading';

const Layout = lazy(() => import('./components/layout'));
const SelectedClientsScreen = lazy(() => import('./screens/selected-clients'));
const LoginScreen = lazy(() => import('./screens/login'));
const ClientsScreen = lazy(() => import('./screens/clients'));

export function Router() {
	const isLoggedIn = useAuthStore(useShallow((state) => !!state.userName));

	const authRoutes = createBrowserRouter([
		{
			path: '/',
			element: <LoginScreen />,
		},
		{
			path: '*',
			element: <Navigate to="/" />,
		},
	]);

	const appRoutes = createBrowserRouter([
		{
			path: '/',
			element: <Layout />,
			children: [
				{
					path: '/',
					element: <Navigate to="/clients" />,
				},
				{
					path: '/clients',
					element: <ClientsScreen />,
				},
				{
					path: '/selected-clients',
					element: <SelectedClientsScreen />,
				},
				{
					path: '*',
					element: <Navigate to="/" />,
				},
			],
		},
	]);

	return (
		<Suspense fallback={<LoadingScreen />}>
			<RouterProvider router={isLoggedIn ? appRoutes : authRoutes} />
		</Suspense>
	);
}
