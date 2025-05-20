import type { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { useMutation, useQuery } from '@tanstack/react-query';

import { api } from './api';
import { EQueryKeys } from '~/enums/query';
import type { IError } from '~/interfaces/error';
import type { IPaginatedResponse, IPaginationRequest } from '~/interfaces/common';
import type { IClient, IClientRequest } from '~/interfaces/client';
import { buildUrl } from '~/utils/url';
import { useClientStore } from '~/stores/client';

export function useGetClients(
	props: IPaginationRequest,
): UseQueryResult<IPaginatedResponse<IClient>, IError> {
	return useQuery({
		queryKey: [EQueryKeys.CLIENTS, props.limit, props.page],
		queryFn: async () => {
			const url = buildUrl('/clients', {
				page: props.page,
				limit: props.limit,
			});

			const response = await api.get(url);

			return response.data;
		},
	});
}

export function usePostClient(): UseMutationResult<void, IError, IClientRequest> {
	return useMutation({
		mutationFn: async (data: IClientRequest) => {
			const response = await api.post('/clients', data);

			return response.data;
		},
	});
}

export function usePatchClient(): UseMutationResult<IClient, IError, IClientRequest> {
	return useMutation({
		mutationFn: async (data: IClientRequest) => {
			const response = await api.patch<IClient>(`/clients/${data.id}`, data);

			return response.data;
		},
		onSuccess: (client) => {
			useClientStore.getState().update(client);
		},
	});
}

export function useDeleteClient(): UseMutationResult<void, IError, string> {
	return useMutation({
		mutationFn: async (id: string) => {
			const response = await api.delete(`/clients/${id}`);

			return response.data;
		},
	});
}
