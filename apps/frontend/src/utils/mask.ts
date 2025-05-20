import { formatCurrency } from './currency';
import { sanitizeNumber } from './number';

export function maskCurrency(value: string): string {
	const sanitizedValue = sanitizeNumber(value);

	if (!sanitizedValue) {
		return 'R$ 0,00';
	}

	const numericValue = Number(sanitizedValue) / 100;

	return formatCurrency(numericValue);
}
