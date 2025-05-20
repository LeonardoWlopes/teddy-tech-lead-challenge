export function sanitizeNumber(value: string): number {
	return Number(value.replace(/\D/g, ''));
}

export function sanitizeNumberToCurrency(value: string): number {
	return sanitizeNumber(value) / 100;
}
