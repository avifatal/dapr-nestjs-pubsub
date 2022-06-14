import { Module } from '@nestjs/common';
import { DaprServer } from 'dapr-client';
import { PageViewController } from './page-view.controller';

@Module({
  imports: [],
  controllers: [PageViewController],
  providers: [{ provide: DaprServer, useValue: new DaprServer() }],
})
export class PageViewModule {}
