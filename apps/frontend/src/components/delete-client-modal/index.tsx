import { Trans, useTranslation } from 'react-i18next';
import { Modal } from '../modal';
import { IDeleteClientModalProps } from './types';
import { useDeleteClientModalContainer } from './container';
import { Button } from '../button';

export function DeleteClientModal(props: IDeleteClientModalProps) {
	const { isOpen, onRequestClose, client } = props;

	const { t } = useTranslation('delete_client_modal');

	const { handleDelete, isDeletingClient } = useDeleteClientModalContainer(props);

	return (
		<Modal isOpen={isOpen} onRequestClose={onRequestClose} title={t('title')}>
			<p className="mb-4 text-base font-normal">
				<Trans
					t={t}
					i18nKey="description"
					values={{
						name: client?.name,
					}}
					components={[<strong className="ml-1" />]}
				/>
			</p>

			<Button
				className="w-full"
				onClick={handleDelete}
				type="submit"
				loading={isDeletingClient}
			>
				{t('button')}
			</Button>
		</Modal>
	);
}
