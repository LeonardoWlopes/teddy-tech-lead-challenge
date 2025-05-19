import type { IInputProps } from './types';
import { twMerge } from 'tailwind-merge';

export function Input(props: IInputProps) {
	const { className, placeholder, disabled = false, ...rest } = props;

	return (
		<div
			className={twMerge(
				'border-grey-02 relative flex items-center rounded-xs border-2 border-zinc-300',
				className,
			)}
		>
			<input
				{...rest}
				className={twMerge(
					'flex-1 px-5 py-2 text-2xl font-normal text-neutral-400 outline-zinc-400 placeholder:text-neutral-400',
				)}
				placeholder={placeholder}
				disabled={disabled}
			/>
		</div>
	);
}
