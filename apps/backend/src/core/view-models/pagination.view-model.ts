import { Pagination } from '../entities/pagination.entity';

export class PaginationViewModel {
	static toHTTP(pagination: Pagination) {
		return {
			total: pagination.total,
			page: pagination.page,
			limit: pagination.limit,
			totalPages: pagination.totalPages,
			previousPage: pagination.previousPage,
			nextPage: pagination.nextPage,
		};
	}
}
