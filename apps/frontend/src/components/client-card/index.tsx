import { twMerge } from 'tailwind-merge';
import { IClientCardProps } from './types';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from '~/utils/currency';
import PlusIcon from '~/assets/icons/plus.svg';
import PencilIcon from '~/assets/icons/pencil.svg';
import TrashIcon from '~/assets/icons/trash.svg';
import MinusIcon from '~/assets/icons/minus.svg';
import { useClientCardContainer } from './container';

export function ClientCard(props: IClientCardProps) {
	const { client, className, onSelect, onEdit, onDelete } = props;

	const { t } = useTranslation('client_card');

	const { handleSelect, handleEdit, handleDelete, isSelected } = useClientCardContainer(props);

	const DeleteIcon = isSelected ? MinusIcon : TrashIcon;

	return (
		<div
			className={twMerge(
				'flex flex-col items-center justify-center gap-2.5 rounded border border-transparent bg-white p-4 shadow-md',
				isSelected && 'border-zinc-300 bg-gray-100',
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
				<div className="h-5 w-5">
					{!isSelected && onSelect && (
						<PlusIcon
							className="h-5 w-5 cursor-pointer active:opacity-80"
							onClick={handleSelect}
						/>
					)}
				</div>

				<div className="h-5 w-5">
					{onEdit && (
						<PencilIcon
							className="h-5 w-5 cursor-pointer active:opacity-80"
							onClick={handleEdit}
						/>
					)}
				</div>

				<div className="h-5 w-5">
					{onDelete && (
						<DeleteIcon
							className="h-5 w-5 cursor-pointer text-red-500 active:opacity-80"
							onClick={handleDelete}
						/>
					)}
				</div>
			</div>
		</div>
	);
}
