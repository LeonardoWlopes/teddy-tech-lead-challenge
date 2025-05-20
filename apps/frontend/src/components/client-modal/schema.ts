import { z } from 'zod';
import { t } from '~/i18n/config';
import { sanitizeNumber } from '~/utils/number';

export const clientModalSchema = z.object({
	name: z.string({ required_error: t('errors:required') }).min(1, {
		message: t('errors:required'),
	}),
	salary: z
		.string({ required_error: t('errors:required') })
		.transform((value) => sanitizeNumber(value))
		.pipe(z.number().min(1, { message: t('errors:min', { min: 1 }) })),
	company: z
		.string({ required_error: t('errors:required') })
		.transform((value) => sanitizeNumber(value))
		.pipe(z.number().min(1, { message: t('errors:min', { min: 1 }) })),
});
