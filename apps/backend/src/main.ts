import { NestFactory } from '@nestjs/core';
import { AppModule } from './infra/modules/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { version } from '../package.json';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.enableCors();
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
		}),
	);

	const config = new DocumentBuilder()
		.setTitle('Teddy Tech Lead Challenge API')
		.setDescription('API for the Teddy Tech Lead Challenge')
		.setVersion(version)
		.addBearerAuth()
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('docs', app, document);

	await app.listen(3000);
}
bootstrap();
