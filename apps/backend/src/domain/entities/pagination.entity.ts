export interface IPagination {
	page?: number;
	limit?: number;
	total?: number;
}

export class Pagination {
	private _props: IPagination;
	private _totalPages: number = 0;
	private _previousPage: number | null = null;
	private _nextPage: number | null = null;

	constructor(payload: IPagination) {
		const { page = 1, limit = 15, total = 0 } = payload;

		this.validate(payload);

		this._props = {
			page,
			limit,
			total,
		};
	}

	private validate(payload: IPagination): void {
		if (payload.page < 1) {
			throw new Error('Page must be greater than 0');
		}

		if (payload.limit < 1) {
			throw new Error('Limit must be greater than 0');
		}

		if (payload.total < 0) {
			throw new Error('Total must be greater or equal to 0');
		}
	}

	public update(props: Partial<IPagination>): void {
		const newProps = { ...this._props, ...props };

		this.validate(newProps);

		this._props = newProps;
	}

	public recalculate() {
		this._totalPages = Math.ceil(this._props.total / this._props.limit);
		this._previousPage = this._props.page - 1 || null;

		if (this._props.page < this._totalPages) this._nextPage = this._props.page + 1;
	}

	get total() {
		return this._props.total;
	}

	get page() {
		return this._props.page;
	}

	get limit() {
		return this._props.limit;
	}

	get totalPages() {
		return this._totalPages;
	}

	get previousPage() {
		return this._previousPage;
	}

	get nextPage() {
		return this._nextPage;
	}
}
