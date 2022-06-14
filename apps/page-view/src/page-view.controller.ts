import { Controller, Get } from '@nestjs/common';
import { PageViewDto } from 'apps/api/src/app.controller';
import { DaprPubSubSubscribe } from 'apps/shared/decorators';

@Controller()
export class PageViewController {
  private readonly data = [];
  constructor() {}

  @DaprPubSubSubscribe('pubsub', 'add')
  addPageView(data: PageViewDto) {
    console.log(`addPageView executed with data: ${JSON.stringify(data)}`);
    this.data.push(data);
  }
}
