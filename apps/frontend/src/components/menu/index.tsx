import { useCallback, useRef } from 'react';
import { IMenuProps } from './types';
import ArrowLeftIcon from '~/assets/icons/circle-arrow-left.svg';
import logo from '~/assets/images/logo.png';
import { useOnClickOutside } from '~/hooks/use-on-click-outside';
import { twMerge } from 'tailwind-merge';
import { MENU_NAVIGATION_MOCK } from '~/utils/mock';
import { NavLink } from 'react-router';

export function Menu({ isMenuOpen, toggleIsMenuOpen }: IMenuProps) {
	const menuRef = useRef<HTMLDivElement>(null);

	const handleCloseMenu = useCallback(() => {
		if (isMenuOpen) toggleIsMenuOpen();
	}, [isMenuOpen]);

	useOnClickOutside(menuRef, handleCloseMenu);

	return (
		<div
			className={twMerge(
				'pointer-events-none fixed top-0 left-0 z-50 h-screen w-screen bg-black/30 opacity-0 transition-all duration-300',
				isMenuOpen && 'pointer-events-auto opacity-100',
			)}
		>
			<aside
				ref={menuRef}
				className={twMerge(
					'h-full w-full max-w-3xs -translate-x-full rounded-tr-3xl bg-white transition-all duration-300',
					isMenuOpen && 'translate-x-0',
				)}
			>
				<div className="relative flex h-32 items-center justify-center rounded-tr-3xl bg-zinc-700 select-none">
					<img src={logo} alt="logo" className="w-24" />

					<div
						className="absolute -right-5 -bottom-5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black active:opacity-80"
						onClick={handleCloseMenu}
					>
						<ArrowLeftIcon className="h-3.5 w-3.5 text-white" />
					</div>
				</div>

				<ul className="flex flex-col gap-3 py-12">
					{MENU_NAVIGATION_MOCK.map(({ label, href, icon: Icon }) => (
						<li key={label}>
							<NavLink
								className="flex h-11 items-center gap-4 border-r-2 border-transparent pl-9 [.active]:border-orange-500 [.active]:text-orange-500"
								to={href}
							>
								<Icon />

								<span className="text-sm font-medium capitalize">{label}</span>
							</NavLink>
						</li>
					))}
				</ul>
			</aside>
		</div>
	);
}
