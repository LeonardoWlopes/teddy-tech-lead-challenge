type CurrencyValue = number | string;

export class Currency {
	private readonly _value: number;
	private static readonly PRECISION = 2;
	private static readonly MULTIPLIER = 10 ** Currency.PRECISION;

	constructor(value: CurrencyValue) {
		this.validate(value);

		this._value = Currency.toCents(value);
	}

	private validate(value: CurrencyValue): void {
		if (typeof value === 'string' && Number(value) < 0) {
			throw new Error('The value cannot be negative');
		}

		if (typeof value === 'number' && value < 0) {
			throw new Error('The value cannot be negative');
		}
	}

	private static toCents(value: CurrencyValue): number {
		if (typeof value === 'string') {
			const sanitized = value.replace(/[^\d.-]/g, '');
			return Math.round(Number(sanitized) * Currency.MULTIPLIER);
		}

		return Math.round(value * Currency.MULTIPLIER);
	}

	get value(): number {
		return this._value / Currency.MULTIPLIER;
	}

	get rawValue(): number {
		return this._value;
	}

	toJSON(): number {
		return this.value;
	}
}
