import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { api } from './api';
import { EQueryKeys } from '~/enums/query';
import { IError } from '~/interfaces/error';
import { IPaginatedResponse, IPaginationRequest } from '~/interfaces/common';
import { IClient } from '~/interfaces/client';
import { buildUrl } from '~/utils/url';

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
