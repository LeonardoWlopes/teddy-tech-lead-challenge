import { BaseError } from './base.error';

export class NotFoundError extends BaseError {
	statusCode: number;

	constructor(message = 'Resource not found', statusCode = 404) {
		super(message);
		this.statusCode = statusCode;
	}
}
