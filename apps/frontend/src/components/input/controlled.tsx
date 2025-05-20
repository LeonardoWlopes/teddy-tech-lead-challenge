import type { ChangeEvent } from 'react';
import { Controller, type FieldValues } from 'react-hook-form';
import { Input } from '.';
import type { IControlledInputProps } from './types';

function ControlledInput<T extends FieldValues>({
	control,
	name,
	maskFunction,
	...rest
}: IControlledInputProps<T>) {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange, onBlur, value, ref } }) => {
				return (
					<Input
						ref={ref}
						onChange={(e: ChangeEvent<HTMLInputElement>) => {
							if (maskFunction) {
								onChange(maskFunction(e.target.value));
								return;
							}

							onChange(e);
						}}
						onBlur={onBlur}
						value={value || ''}
						name={name}
						{...rest}
					/>
				);
			}}
		/>
	);
}

export { ControlledInput };
