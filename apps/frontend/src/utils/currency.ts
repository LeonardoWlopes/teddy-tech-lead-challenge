/**
 * Formats a numeric value to Brazilian currency format (R$)
 * @param value - The numeric value to be formatted
 * @returns string - The value formatted in Brazilian Reais (R$)
 */
export function formatCurrency(value: number): string {
	return new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(value);
}
