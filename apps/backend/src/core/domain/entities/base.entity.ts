import { Id } from '../value-objects/id.value-object';

export interface IBaseEntity {
	id?: Id;
	createdAt?: Date;
	updatedAt?: Date;
}

export class BaseEntity {
	private _id: Id;
	private _createdAt: Date;
	private _updatedAt: Date;

	constructor({ id, createdAt, updatedAt }: IBaseEntity) {
		this._id = id || new Id();
		this._createdAt = createdAt || new Date();
		this._updatedAt = updatedAt || new Date();
	}

	get id(): Id {
		return this._id;
	}

	get createdAt(): Date {
		return this._createdAt;
	}

	get updatedAt(): Date {
		return this._updatedAt;
	}

	set updatedAt(updatedAt: Date) {
		this._updatedAt = updatedAt;
	}
}
