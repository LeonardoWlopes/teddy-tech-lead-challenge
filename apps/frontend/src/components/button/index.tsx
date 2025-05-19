import { twMerge } from 'tailwind-merge';
import { Loading } from '../loading';
import type { IButtonProps } from './types';

export function Button({
	className,
	children,
	disabled = false,
	loading = false,
	...rest
}: IButtonProps) {
	return (
		<button
			className={twMerge(
				'h-[3.75rem] cursor-pointer rounded-sm bg-orange-500 text-2xl font-bold text-white active:opacity-80',
				className,
			)}
			disabled={disabled}
			{...rest}
		>
			{loading ? <Loading className="h-6 w-6 text-inherit" /> : children}
		</button>
	);
}
