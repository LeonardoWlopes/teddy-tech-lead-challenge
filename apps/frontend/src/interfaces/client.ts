import { IBaseEntity } from './common';

export interface IClient extends IBaseEntity {
	companyValue: number;
	name: string;
	salary: number;
}
