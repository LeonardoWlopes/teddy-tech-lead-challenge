export function sanitizeNumber(value: string): number {
	return Number(value.replace(/\D/g, ''));
}
