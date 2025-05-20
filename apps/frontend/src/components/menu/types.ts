import { Dispatch, SetStateAction } from 'react';

export interface IMenuProps {
	isMenuOpen: boolean;
	toggleIsMenuOpen: () => void;
}
