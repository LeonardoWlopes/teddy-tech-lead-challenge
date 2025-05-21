import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientModule } from './client.module';
import { TypeOrmModule } from '../database/typeorm/typeorm.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		TypeOrmModule,
		ClientModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {
	constructor(private readonly configService: ConfigService) {
		console.log({
			host: configService.get('DB_HOST'),
			port: configService.get('DB_PORT'),
			username: configService.get('DB_USERNAME'),
			password: configService.get('DB_PASSWORD'),
			database: configService.get('DB_NAME'),
		});
	}
}
