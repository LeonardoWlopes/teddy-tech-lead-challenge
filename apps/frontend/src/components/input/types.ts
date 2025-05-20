import type { InputHTMLAttributes, RefObject } from 'react';
import type { Control, FieldValues, Path, RefCallBack } from 'react-hook-form';
import type { inputVariants } from './styles';
import type { VariantProps } from 'class-variance-authority';

export interface IInputProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
		VariantProps<typeof inputVariants> {
	ref?: RefObject<HTMLInputElement | null> | RefCallBack;
}

export interface IControlledInputProps<T extends FieldValues> extends IInputProps {
	control: Control<T>;
	name: Path<T>;
	maskFunction?: (value: string) => string;
}
