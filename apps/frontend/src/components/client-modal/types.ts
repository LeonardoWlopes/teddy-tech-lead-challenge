import { z } from 'zod';
import { IModalProps } from '../modal/types';
import { clientModalSchema } from './schema';
import { IClient } from '~/interfaces/client';

export type IClientModalForm = z.infer<typeof clientModalSchema>;

export interface IClientModalProps extends IModalProps {
	client?: IClient | null;
}
