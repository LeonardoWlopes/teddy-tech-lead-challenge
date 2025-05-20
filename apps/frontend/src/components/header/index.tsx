import { IHeaderProps } from './types';
import MenuIcon from '../../assets/icons/menu.svg';
import logo from '../../assets/images/logo.png';
import { HEADER_NAVIGATION_MOCK } from '~/utils/mock';
import { NavLink } from 'react-router';
import { Trans, useTranslation } from 'react-i18next';
import { useHeaderContainer } from './container';

export function Header({ toggleIsMenuOpen }: IHeaderProps) {
	const { t } = useTranslation('header');

	const { handleLogout, firstName } = useHeaderContainer();

	return (
		<header className="flex min-h-[6.25rem] items-center justify-between bg-white pr-30 pl-12 shadow-md select-none">
			<div className="flex items-center justify-center gap-10">
				<MenuIcon
					className="h-6 w-6 cursor-pointer active:opacity-80"
					onClick={toggleIsMenuOpen}
				/>

				<img src={logo} alt="logo" className="w-[6.25rem]" />
			</div>

			<ul className="flex items-center gap-8 font-normal text-black">
				{HEADER_NAVIGATION_MOCK.map(({ href, label }) => (
					<li key={label}>
						<NavLink
							className="[.active]:text-orange-500 [.active]:underline"
							to={href}
						>
							{label}
						</NavLink>
					</li>
				))}

				<span className="cursor-pointer" onClick={handleLogout}>
					{t('exit')}
				</span>
			</ul>

			<span>
				<Trans
					t={t}
					i18nKey="hello"
					values={{
						name: firstName,
					}}
					components={[<strong className="ml-1" />]}
				/>
			</span>
		</header>
	);
}
