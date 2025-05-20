import { useCallback, useState } from 'react';
import { useGetClients } from '~/services/clients';
import type { IClient } from '~/interfaces/client';
import { useClientStore } from '~/stores/client';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

export function useClientsContainer() {
	const [page, setPage] = useState(1);

	const [itemsPerPage, setItemsPerPage] = useState(15);

	const [isFormOpen, setIsFormOpen] = useState(false);

	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	const [clientToHandle, setClientToHandle] = useState<IClient | null>(null);

	const { t } = useTranslation('clients');

	const { add: addClient, remove: removeClient, clients: storeClients } = useClientStore();

	const { data, isLoading: isLoadingClients } = useGetClients({
		page,
		limit: itemsPerPage,
	});

	const handleCloseModal = useCallback(() => {
		setIsFormOpen(false);
		setClientToHandle(null);
		setIsDeleteModalOpen(false);
	}, []);

	const handleOpenModal = useCallback((client?: IClient) => {
		setClientToHandle(client || null);
		setIsFormOpen(true);
	}, []);

	function handleDeleteClient(client: IClient) {
		const isAlreadySelected = storeClients.some((c) => c.id === client?.id);

		if (isAlreadySelected) {
			removeClient(client.id);
			return;
		}

		setClientToHandle(client || null);
		setIsDeleteModalOpen(true);
	}

	function handleSelectClient(client: IClient) {
		toast.success(t('success_select'));

		addClient(client);
	}

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
		clientToHandle,
		isDeleteModalOpen,
		handleDeleteClient,
		handleSelectClient,
	};
}
