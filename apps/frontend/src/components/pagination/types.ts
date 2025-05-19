export interface IPaginationProps {
	totalItems?: number;
	itemsPerPage?: number;
	page?: number;
	onPageChange?: (page: number) => void;
}
