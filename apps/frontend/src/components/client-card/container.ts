import type { IClientCardProps } from './types';
import { useClientStore } from '~/stores/client';
import { useShallow } from 'zustand/shallow';

export function useClientCardContainer({ client, onSelect, onEdit, onDelete }: IClientCardProps) {
	const selectedClientIds = useClientStore(
		useShallow((state) => state.clients.map((client) => client.id)),
	);

	const isSelected = selectedClientIds.includes(client.id);

	function handleSelect() {
		onSelect?.(client);
	}

	function handleEdit() {
		onEdit?.(client);
	}

	function handleDelete() {
		onDelete?.(client);
	}

	return { handleSelect, handleEdit, handleDelete, isSelected };
}
