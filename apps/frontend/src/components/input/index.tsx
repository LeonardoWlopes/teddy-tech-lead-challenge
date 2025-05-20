import { inputVariants } from './styles';
import type { IInputProps } from './types';
import { twMerge } from 'tailwind-merge';

export function Input(props: IInputProps) {
	const { className, placeholder, disabled = false, size, ...rest } = props;

	return (
		<input
			{...rest}
			className={twMerge(inputVariants({ size }), className)}
			placeholder={placeholder}
			disabled={disabled}
		/>
	);
}
