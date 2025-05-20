import type { IClient } from '~/interfaces/client';

export interface IClientCardProps {
	client: IClient;
	onSelect?: (client: IClient) => void;
	onEdit?: (client: IClient) => void;
	onDelete?: (client: IClient) => void;
	className?: string;
}
