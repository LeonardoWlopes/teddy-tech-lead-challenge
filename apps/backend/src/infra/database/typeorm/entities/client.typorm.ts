import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('client')
export class ClientOrmEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column('decimal', { precision: 10, scale: 2 })
	salary: number;

	@Column('decimal', { precision: 10, scale: 2 })
	companyValue: number;

	@Column()
	createdAt: Date;

	@Column()
	updatedAt: Date;
}
