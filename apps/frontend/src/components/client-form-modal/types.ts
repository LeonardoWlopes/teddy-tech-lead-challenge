import type { z } from 'zod';
import type { IModalProps } from '../modal/types';
import type { clientModalSchema } from './schema';
import type { IClient } from '~/interfaces/client';

export type IClientFormModalForm = z.infer<typeof clientModalSchema>;

export interface IClientFormModalProps extends IModalProps {
	client?: IClient | null;
}
