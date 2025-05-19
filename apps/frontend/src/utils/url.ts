/**
 * Builds a URL string by combining a base URL with query parameters
 * @param baseUrl - The base URL string
 * @param params - Object containing query parameters
 * @returns string - The complete URL with query parameters
 */
export function buildUrl(baseUrl: string, params: object): string {
	const queryParams: string[] = [];

	for (const [key, value] of Object.entries(params)) {
		if (value !== undefined && value !== null) {
			const encodedKey = encodeURIComponent(key);
			const encodedValue = encodeURIComponent(String(value));
			queryParams.push(`${encodedKey}=${encodedValue}`);
		}
	}

	const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
	return `${baseUrl}${queryString}`;
}
