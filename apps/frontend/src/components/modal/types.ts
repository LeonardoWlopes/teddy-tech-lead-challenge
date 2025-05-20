import type { ReactNode } from 'react';

export interface IModalProps {
	isOpen: boolean;
	onRequestClose: () => void;
	children?: ReactNode;
	title?: string;
}
