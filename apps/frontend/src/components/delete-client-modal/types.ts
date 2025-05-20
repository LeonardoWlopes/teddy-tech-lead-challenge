import type { IModalProps } from '../modal/types';
import type { IClient } from '~/interfaces/client';

export interface IDeleteClientModalProps extends IModalProps {
	client?: IClient | null;
}
