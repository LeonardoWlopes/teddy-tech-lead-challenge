import { useMemo } from 'react';
import type { IPaginationProps } from './types';
import { twMerge } from 'tailwind-merge';

export function Pagination({
	totalItems = 0,
	itemsPerPage = 15,
	page = 1,
	onPageChange,
}: IPaginationProps) {
	const totalPages = useMemo(() => {
		return Math.ceil(totalItems / itemsPerPage);
	}, [totalItems, itemsPerPage]);

	if (totalPages === 1) return null;

	return (
		<div className="flex items-center justify-center gap-2">
			{Array.from({ length: totalPages }).map((_, index) => {
				const pageNumber = index + 1;

				return (
					<div
						key={pageNumber}
						className={twMerge(
							'flex h-8 w-8 cursor-pointer items-center justify-center rounded-md transition-all',
							pageNumber === page ? 'bg-orange-500 text-white' : 'hover:bg-zinc-300',
						)}
						onClick={() => onPageChange?.(pageNumber)}
					>
						<strong>{pageNumber}</strong>
					</div>
				);
			})}
		</div>
	);
}
