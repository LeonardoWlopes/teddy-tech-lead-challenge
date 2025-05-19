import { twMerge } from 'tailwind-merge';
import { Loading } from '../loading';
import type { IButtonProps } from './types';
import { buttonVariants } from './styles';

export function Button({
	className,
	children,
	disabled = false,
	loading = false,
	variant,
	size,
	...rest
}: IButtonProps) {
	return (
		<button
			className={twMerge(buttonVariants({ variant, size }), className)}
			disabled={disabled}
			{...rest}
		>
			{loading ? <Loading className="h-6 w-6 text-inherit" /> : children}
		</button>
	);
}
