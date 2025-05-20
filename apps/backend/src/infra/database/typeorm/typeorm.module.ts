import { Global, Module } from '@nestjs/common';
import { TypeOrmModule as NestTypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientOrmEntity } from './entities/client.typorm';
import { ClientRepository } from '~/application/repositories/client.repository';
import { TypeOrmClientRepository } from './repositories/typeorm-client.repository';

@Global()
@Module({
	imports: [
		NestTypeOrmModule.forFeature([ClientOrmEntity]),
		NestTypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => {
				return {
					type: 'postgres',
					host: configService.get('DB_HOST'),
					port: configService.get('DB_PORT'),
					username: configService.get('DB_USERNAME'),
					password: configService.get('DB_PASSWORD'),
					database: configService.get('DB_NAME'),
					entities: [ClientOrmEntity],
					synchronize: true,
				};
			},
		}),
	],
	providers: [{ provide: ClientRepository, useClass: TypeOrmClientRepository }],
	exports: [ClientRepository],
})
export class TypeOrmModule {}
