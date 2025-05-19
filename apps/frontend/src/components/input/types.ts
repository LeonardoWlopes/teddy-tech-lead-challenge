import type { InputHTMLAttributes, RefObject } from 'react';
import type { Control, FieldValues, Path, RefCallBack } from 'react-hook-form';

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
	ref?: RefObject<HTMLInputElement | null> | RefCallBack;
}

export interface IControlledInputProps<T extends FieldValues> extends IInputProps {
	control: Control<T>;
	name: Path<T>;
	maskFunction?: (value: string) => string;
}
