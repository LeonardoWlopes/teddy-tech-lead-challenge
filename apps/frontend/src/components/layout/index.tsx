import { Outlet } from 'react-router';
import { Header } from '../header';
import { Menu } from '../menu';
import { Suspense, useReducer } from 'react';
import { LoadingScreen } from '~/screens/loading';

export default function Layout() {
	const [isMenuOpen, toggleIsMenuOpen] = useReducer((state) => !state, false);

	return (
		<div className="flex h-screen w-screen">
			<Menu isMenuOpen={isMenuOpen} toggleIsMenuOpen={toggleIsMenuOpen} />

			<div className="flex flex-1 flex-col">
				<Header toggleIsMenuOpen={toggleIsMenuOpen} />

				<main className="flex h-full flex-col overflow-y-auto px-30 py-8">
					<Suspense fallback={<LoadingScreen />}>
						<Outlet />
					</Suspense>
				</main>
			</div>
		</div>
	);
}
