import SpinnerIcon from '~/assets/icons/spinner.svg';
import { twMerge } from 'tailwind-merge';
import type { ILoadingProps } from './types';

export function Loading({ className }: ILoadingProps) {
	return (
		<div
			className={twMerge(
				'text-primary-04 flex aspect-square h-8 w-8 animate-spin items-center justify-center',
				className,
			)}
		>
			<SpinnerIcon className="h-full w-full" />
		</div>
	);
}
