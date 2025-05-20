import { useCallback, useState } from 'react';
import { useGetClients } from '~/services/clients';
import { IClient } from '~/interfaces/client';

export function useClientsContainer() {
	const [page, setPage] = useState(1);

	const [itemsPerPage, setItemsPerPage] = useState(15);

	const [isFormOpen, setIsFormOpen] = useState(false);

	const [clientToEdit, setClientToEdit] = useState<IClient | null>(null);

	const { data, isLoading: isLoadingClients } = useGetClients({
		page,
		limit: itemsPerPage,
	});

	const handleCloseModal = useCallback(() => {
		setIsFormOpen(false);
		setClientToEdit(null);
	}, []);

	const handleOpenModal = useCallback((client?: IClient) => {
		setClientToEdit(client || null);
		setIsFormOpen(true);
	}, []);

	return {
		data,
		isLoadingClients,
		page,
		itemsPerPage,
		setPage,
		setItemsPerPage,
		handleCloseModal,
		handleOpenModal,
		isFormOpen,
		clientToEdit,
	};
}
