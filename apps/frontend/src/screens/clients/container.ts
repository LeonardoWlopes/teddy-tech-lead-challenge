import { useState } from 'react';
import { useGetClients } from '~/services/clients';

export function useClientsContainer() {
	const [page, setPage] = useState(1);

	const [itemsPerPage, setItemsPerPage] = useState(15);

	const { data, isLoading: isLoadingClients } = useGetClients({
		page,
		limit: itemsPerPage,
	});

	return {
		data,
		isLoadingClients,
		page,
		itemsPerPage,
		setPage,
		setItemsPerPage,
	};
}
