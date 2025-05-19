import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
	'cursor-pointer rounded-sm font-bold  active:opacity-80 border-2 border-transparent',
	{
		variants: {
			variant: {
				primary: 'bg-orange-500 text-white',
				neutral: 'border-orange-500 text-orange-500',
			},
			size: {
				sm: 'h-10',
				lg: 'h-[3.75rem] text-2xl',
			},
		},
		defaultVariants: {
			variant: 'primary',
			size: 'sm',
		},
	},
);
