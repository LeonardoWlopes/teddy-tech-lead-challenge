import { IModalProps } from '../modal/types';
import { IClient } from '~/interfaces/client';

export interface IDeleteClientModalProps extends IModalProps {
	client?: IClient | null;
}
