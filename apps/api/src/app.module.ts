import { Module } from '@nestjs/common';
import { DaprClient } from 'dapr-client';
import { AppController } from './app.controller';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    {
      provide: DaprClient,
      useValue: new DaprClient('127.0.0.1', process.env.DAPR_HTTP_PORT),
    },
  ],
})
export class AppModule {}
