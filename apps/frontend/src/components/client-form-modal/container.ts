import { useForm } from 'react-hook-form';
import type { IClientFormModalForm } from './types';
import { clientModalSchema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { devError } from '~/utils/log';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import type { IClientFormModalProps } from './types';
import { usePatchClient, usePostClient } from '~/services/clients';
import { queryClient } from '~/providers/query-provider';
import { EQueryKeys } from '~/enums/query';
import { useEffect } from 'react';
import { sanitizeNumberToCurrency } from '~/utils/number';
import { formatCurrency } from '~/utils/currency';

export function useClientFormModalContainer({ client, onRequestClose }: IClientFormModalProps) {
	const { t } = useTranslation('client_form_modal');

	const { mutateAsync: createAsync, isPending: isCreatingClient } = usePostClient();

	const { mutateAsync: updateAsync, isPending: isUpdatingClient } = usePatchClient();

	const { control, handleSubmit, setValue, reset } = useForm<IClientFormModalForm>({
		resolver: zodResolver(clientModalSchema),
	});

	const isLoading = isCreatingClient || isUpdatingClient;

	const isEditMode = !!client;

	const submit = handleSubmit(
		async ({ name, salary, company }) => {
			const method = isEditMode ? updateAsync : createAsync;

			try {
				await method({
					name,
					salary: sanitizeNumberToCurrency(salary),
					companyValue: sanitizeNumberToCurrency(company),
					id: client?.id,
				});

				queryClient.refetchQueries({ queryKey: [EQueryKeys.CLIENTS] });

				toast.success(isEditMode ? t('success_update') : t('success_create'));

				onRequestClose?.();

				reset();
			} catch (err) {
				const error = err as Error;

				devError('Error on submit client modal form', error);

				toast.error(error.cause as string);
			}
		},
		(errors) => {
			const firstError = Object.values(errors).find((error) => error)?.message;

			toast.warning(t('invalid_form'), {
				description: firstError,
			});

			devError('Error on validate client modal form', errors);
		},
	);

	function setupForm() {
		setValue('name', client?.name || '');
		if (client?.salary) setValue('salary', formatCurrency(client.salary));
		if (client?.companyValue) setValue('company', formatCurrency(client.companyValue));
	}
	useEffect(setupForm, [client]);

	return { control, submit, isEditMode, isLoading };
}
