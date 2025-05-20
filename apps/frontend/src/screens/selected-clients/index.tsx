import { useTranslation } from 'react-i18next';
import { useSelectedClientsContainer } from './container';
import { ClientCard } from '~/components/client-card';
import { Button } from '~/components/button';

export default function SelectedClientsScreen() {
	const { t } = useTranslation('selected_clients');

	const { clients, removeClient, resetClients } = useSelectedClientsContainer();

	return (
		<div className="flex flex-1 flex-col">
			<p className="mb-3 text-lg font-normal">{t('title')}</p>

			<div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
				{clients?.map((client) => (
					<ClientCard
						key={client.id}
						onDelete={() => removeClient(client.id)}
						client={client}
					/>
				))}
			</div>

			<Button className="mt-auto mb-5" onClick={() => resetClients()} variant={'neutral'}>
				{t('clear')}
			</Button>
		</div>
	);
}
