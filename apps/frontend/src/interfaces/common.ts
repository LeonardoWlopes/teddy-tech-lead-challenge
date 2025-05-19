export interface IPaginationMetadata {
	total: number;
	page: number;
	limit: number;
	totalPages: number;
	previousPage: number | null;
	nextPage: number | null;
}

export interface IPaginatedResponse<T> {
	items: T[];
	metadata: IPaginationMetadata;
}

export interface IPaginationRequest {
	page: number;
	limit: number;
}

export interface IBaseEntity {
	createdAt: string;
	id: string;
	updatedAt: string;
}
