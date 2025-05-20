import { useTranslation } from 'react-i18next';
import { Modal } from '../modal';
import { IClientFormModalProps } from './types';
import { useClientFormModalContainer } from './container';
import { ControlledInput } from '../input/controlled';
import { Button } from '../button';
import { maskCurrency } from '~/utils/mask';

export function ClientFormModal(props: IClientFormModalProps) {
	const { isOpen, onRequestClose } = props;

	const { t } = useTranslation('client_form_modal');

	const { control, submit, isEditMode, isLoading } = useClientFormModalContainer(props);

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			title={isEditMode ? t('edit') : t('create')}
		>
			<form className="flex flex-col gap-2" onSubmit={submit}>
				<ControlledInput control={control} size="sm" name="name" placeholder={t('name')} />

				<ControlledInput
					control={control}
					size="sm"
					name="salary"
					placeholder={t('salary')}
					maskFunction={maskCurrency}
				/>

				<ControlledInput
					control={control}
					size="sm"
					name="company"
					placeholder={t('company')}
					maskFunction={maskCurrency}
				/>

				<Button type="submit" loading={isLoading}>
					{isEditMode ? t('edit') : t('create')}
				</Button>
			</form>
		</Modal>
	);
}
