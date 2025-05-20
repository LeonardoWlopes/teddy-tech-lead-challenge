import { cva } from 'class-variance-authority';

export const inputVariants = cva(
	'flex border-2 border-zinc-300 text-neutral-400 outline-zinc-400 placeholder:text-neutral-400',
	{
		variants: {
			size: {
				sm: 'rounded h-10 text-base px-3',
				lg: 'px-5 h-[3.75rem] text-2xl font-normal rounded-xs',
			},
		},
		defaultVariants: {
			size: 'lg',
		},
	},
);
