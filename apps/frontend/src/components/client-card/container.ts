import { useCallback } from 'react';
import type { IClientCardProps } from './types';
import { useClientStore } from '~/stores/client';
import { useShallow } from 'zustand/shallow';

export function useClientCardContainer({ client, onSelect, onEdit, onDelete }: IClientCardProps) {
	const selectedClientIds = useClientStore(
		useShallow((state) => state.clients.map((client) => client.id)),
	);

	const isSelected = selectedClientIds.includes(client.id);

	const handleSelect = useCallback(() => {
		onSelect?.(client);
	}, [client]);

	const handleEdit = useCallback(() => {
		onEdit?.(client);
	}, [client]);

	const handleDelete = useCallback(() => {
		onDelete?.(client);
	}, [client]);

	return { handleSelect, handleEdit, handleDelete, isSelected };
}
