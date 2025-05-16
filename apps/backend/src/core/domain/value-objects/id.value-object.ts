import crypto from 'node:crypto';

export class Id {
	private _id: string;

	constructor(id?: string) {
		this._id = id || crypto.randomUUID();
	}

	get value(): string {
		return this._id;
	}
}
