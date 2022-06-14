import { NestFactory } from '@nestjs/core';
import { useDaprPubSubListener } from 'apps/shared/decorators';
import { DaprServer } from 'dapr-client';
import { PageViewModule } from './page-view.module';

async function bootstrap() {
  const app = await NestFactory.create(PageViewModule);
  const server = app.get(DaprServer);
  await useDaprPubSubListener(app);
  await server.start();
}
bootstrap();
