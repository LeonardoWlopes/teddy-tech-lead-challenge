import { twMerge } from 'tailwind-merge';
import { IClientCardProps } from './types';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from '~/utils/currency';
import PlusIcon from '~/assets/icons/plus.svg';
import PencilIcon from '~/assets/icons/pencil.svg';
import TrashIcon from '~/assets/icons/trash.svg';
import { useCallback } from 'react';

export function ClientCard({ client, className, onSelect, onEdit, onDelete }: IClientCardProps) {
	const { t } = useTranslation('client_card');

	const handleSelect = useCallback(() => {
		onSelect?.(client);
	}, [client]);

	const handleEdit = useCallback(() => {
		onEdit?.(client);
	}, [client]);

	const handleDelete = useCallback(() => {
		onDelete?.(client);
	}, [client]);

	return (
		<div
			className={twMerge(
				'flex flex-col items-center justify-center gap-2.5 bg-white p-4 shadow-md',
				className,
			)}
		>
			<h2 className="text-lg font-bold">{client.name}</h2>

			<span className="text-sm font-normal">
				{t('salary')}: {formatCurrency(client.salary)}
			</span>

			<span className="text-sm font-normal">
				{t('company')}: {formatCurrency(client.companyValue)}
			</span>

			<div className="flex w-full items-center justify-between gap-2">
				<PlusIcon
					className="h-5 w-5 cursor-pointer active:opacity-80"
					onClick={handleSelect}
				/>

				<PencilIcon
					className="h-5 w-5 cursor-pointer active:opacity-80"
					onClick={handleEdit}
				/>

				<TrashIcon
					className="h-5 w-5 cursor-pointer text-red-500 active:opacity-80"
					onClick={handleDelete}
				/>
			</div>
		</div>
	);
}
