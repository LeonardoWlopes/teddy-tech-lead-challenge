import { formatBytes } from '~/utils/data';
import { env } from '~/utils/env';
import { responseErroHandler } from '~/utils/error';
import { devLog } from '~/utils/log';
import axios, { type AxiosInstance, type AxiosResponse } from 'axios';

export const api: AxiosInstance = axios.create({
	baseURL: env.BACKEND_URL,
	timeout: 1000 * 10, // 10 seconds
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
});

function response<T, D>(response: AxiosResponse<T, D>) {
	const totalBytes = JSON.stringify(response.data).length;

	const logInfos = [
		response.status.toString(),
		response.config.method?.toUpperCase(),
		response.config.url,
		formatBytes(totalBytes > 2 ? totalBytes : 0),
	]
		.filter(Boolean)
		.join(' - ');

	devLog(logInfos);

	return response;
}

api.interceptors.response.use(response, responseErroHandler);
