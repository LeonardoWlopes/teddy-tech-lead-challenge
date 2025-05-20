import { Trans, useTranslation } from 'react-i18next';
import { useClientsContainer } from './container';
import { Loading } from '~/components/loading';
import { ClientCard } from '~/components/client-card';
import { Button } from '~/components/button';
import { Pagination } from '~/components/pagination';
import { ClientModal } from '~/components/client-modal';

export default function ClientsScreen() {
	const { t } = useTranslation('clients');

	const {
		data,
		isLoadingClients,
		page,
		itemsPerPage,
		setPage,
		setItemsPerPage,
		handleCloseModal,
		handleOpenModal,
		clientToEdit,
		isFormOpen,
	} = useClientsContainer();

	if (isLoadingClients) {
		return (
			<div className="flex flex-1 items-center justify-center">
				<Loading />
			</div>
		);
	}

	return (
		<div className="flex flex-1 flex-col">
			<ClientModal
				isOpen={isFormOpen}
				onRequestClose={handleCloseModal}
				client={clientToEdit}
			/>

			<div className="mb-3 flex items-center justify-between">
				<p className="text-lg font-normal">
					<Trans
						t={t}
						i18nKey="list_count"
						values={{ count: data?.metadata.total || 0 }}
						components={[<strong className="ml-1" />]}
					/>
				</p>

				<div className="flex items-center gap-2">
					<p className="text-lg font-normal">{t('pagination')}:</p>

					<select
						className="h-6 rounded-lg border border-zinc-300"
						value={itemsPerPage}
						onChange={(event) => setItemsPerPage(+event.target.value)}
					>
						<option value="15">15</option>
						<option value="20">20</option>
						<option value="25">25</option>
						<option value="30">30</option>
						<option value="35">35</option>
						<option value="40">40</option>
						<option value="45">45</option>
						<option value="50">50</option>
					</select>
				</div>
			</div>

			<div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
				{data?.items.map((client) => (
					<ClientCard
						key={client.id}
						onEdit={() => handleOpenModal(client)}
						client={client}
					/>
				))}
			</div>

			<Button className="mt-auto mb-5" onClick={() => handleOpenModal()} variant={'neutral'}>
				{t('create')}
			</Button>

			<Pagination
				totalItems={data?.metadata.total}
				itemsPerPage={itemsPerPage}
				page={page}
				onPageChange={setPage}
			/>
		</div>
	);
}
