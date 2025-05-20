import { twMerge } from 'tailwind-merge';
import type { IModalProps } from './types';
import { useRef } from 'react';
import CloseIcon from '~/assets/icons/close.svg';
import { useOnClickOutside } from '~/hooks/use-on-click-outside';

export function Modal({ isOpen, onRequestClose, children, title }: IModalProps) {
	const contentRef = useRef<HTMLDivElement>(null);

	useOnClickOutside(contentRef, onRequestClose, isOpen);

	return (
		<div
			className={twMerge(
				'pointer-events-none fixed top-0 left-0 flex h-screen w-screen items-center justify-center bg-black/30 p-6 opacity-0 transition-all duration-300',
				isOpen && 'pointer-events-auto opacity-100',
			)}
		>
			<div className="w-full max-w-100 rounded-md bg-white p-5" ref={contentRef}>
				<div className="mb-5 flex items-center justify-between">
					<h2 className="text-base font-bold">{title}</h2>

					<CloseIcon
						className="h-5 w-5 cursor-pointer active:opacity-80"
						onClick={onRequestClose}
					/>
				</div>

				{children}
			</div>
		</div>
	);
}
