import { useClientStore } from '~/stores/client';

export function useSelectedClientsContainer() {
	const { clients, remove: removeClient, reset: resetClients } = useClientStore();

	return {
		clients,
		removeClient,
		resetClients,
	};
}
