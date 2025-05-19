import { t } from '~/i18n/config';
import HomeIcon from '~/assets/icons/home.svg';
import ClientsIcon from '~/assets/icons/user.svg';
import ProductsIcon from '~/assets/icons/products.svg';

export const HEADER_NAVIGATION_MOCK = [
	{
		label: t('header:clients'),
		href: '/clients',
	},
	{
		label: t('header:selected_clients'),
		href: '/clients/selected',
	},
];

export const MENU_NAVIGATION_MOCK = [
	{
		label: t('menu:home'),
		href: '/',
		icon: HomeIcon,
	},
	{
		label: t('menu:clients'),
		href: '/clients',
		icon: ClientsIcon,
	},
	{
		label: t('menu:products'),
		href: '/products',
		icon: ProductsIcon,
	},
];
