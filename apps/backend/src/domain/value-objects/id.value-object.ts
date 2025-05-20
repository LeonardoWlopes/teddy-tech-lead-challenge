import { randomUUID } from 'node:crypto';

export class Id {
	private _id: string;

	constructor(id?: string) {
		this._id = id || randomUUID();
	}

	get value(): string {
		return this._id;
	}
}
