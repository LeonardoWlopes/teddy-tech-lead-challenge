import type { IDeleteClientModalProps } from './types';
import { useDeleteClient } from '~/services/clients';
import { queryClient } from '~/providers/query-provider';
import { EQueryKeys } from '~/enums/query';

export function useDeleteClientModalContainer({ client, onRequestClose }: IDeleteClientModalProps) {
	const { mutateAsync: deleteAsync, isPending: isDeletingClient } = useDeleteClient();

	async function handleDelete() {
		if (!client) return;

		await deleteAsync(client.id);
		onRequestClose?.();

		queryClient.refetchQueries({ queryKey: [EQueryKeys.CLIENTS] });
	}

	return { handleDelete, isDeletingClient };
}
