import { IBaseEntity } from './common';

export interface IClient extends IBaseEntity {
	companyValue: number;
	name: string;
	salary: number;
}

export interface IClientRequest extends Omit<IClient, keyof IBaseEntity> {
	id?: string;
}
