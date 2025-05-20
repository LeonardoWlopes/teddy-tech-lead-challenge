import { useForm } from 'react-hook-form';
import { IClientModalForm } from './types';
import { clientModalSchema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { devError } from '~/utils/log';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { IClientModalProps } from './types';
import { usePatchClient, usePostClient } from '~/services/clients';
import { queryClient } from '~/providers/query-provider';
import { EQueryKeys } from '~/enums/query';

export function useClientModalContainer({ client, onRequestClose }: IClientModalProps) {
	const { t } = useTranslation('client_modal');

	const { mutateAsync: createAsync, isPending: isCreatingClient } = usePostClient();

	const { mutateAsync: updateAsync, isPending: isUpdatingClient } = usePatchClient();

	const { control, handleSubmit, reset } = useForm<IClientModalForm>({
		resolver: zodResolver(clientModalSchema),
		defaultValues: {
			name: client?.name || '',
			salary: client?.salary || 0,
			company: client?.companyValue || 0,
		},
	});

	const isLoading = isCreatingClient || isUpdatingClient;

	const isEditMode = !!client;

	const submit = handleSubmit(
		async ({ name, salary, company }) => {
			const method = isEditMode ? updateAsync : createAsync;

			try {
				await method({ name, salary, companyValue: company, id: client?.id });

				queryClient.invalidateQueries({ queryKey: [EQueryKeys.CLIENTS] });

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

	return { control, submit, isEditMode, isLoading };
}
