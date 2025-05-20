import { z } from 'zod';
import { IModalProps } from '../modal/types';
import { clientModalSchema } from './schema';
import { IClient } from '~/interfaces/client';

export type IClientFormModalForm = z.infer<typeof clientModalSchema>;

export interface IClientFormModalProps extends IModalProps {
	client?: IClient | null;
}
