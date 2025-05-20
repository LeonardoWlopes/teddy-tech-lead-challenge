import { Client } from '~/domain/entities/client.entity';

export class ClientViewModel {
	static toHTTP(client: Client) {
		return {
			id: client.id.value,
			name: client.name,
			salary: client.salary.value,
			companyValue: client.companyValue.value,
			createdAt: client.createdAt,
			updatedAt: client.updatedAt,
		};
	}
}
