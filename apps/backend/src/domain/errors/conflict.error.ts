import { BaseError } from './base.error';

export class ConflictError extends BaseError {
	statusCode: number;

	constructor(message = 'Resource already exists', statusCode = 409) {
		super(message);
		this.statusCode = statusCode;
	}
}
