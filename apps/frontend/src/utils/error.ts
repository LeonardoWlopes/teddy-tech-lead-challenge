import type { IError } from '~/interfaces/error';
import type { AxiosError } from 'axios';
import { devError } from './log';

export async function responseErroHandler(err: AxiosError<IError>) {
	const error = err.response?.data;

	if (err.code === 'ECONNABORTED') {
		devError('Timeout');

		throw new Error('Timeout');
	}

	const message = error?.message || err.message;

	if (message === err.message) {
		devError(error);
	}

	const logInfos = [err?.response?.status, err?.config?.url, message].filter(Boolean).join(' - ');

	devError(logInfos);

	throw Error(logInfos, { cause: message });
}
