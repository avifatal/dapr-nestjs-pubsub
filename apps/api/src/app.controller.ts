import { Body, Controller, Get, Post } from '@nestjs/common';
import { DaprClient } from 'dapr-client';

export interface PageViewDto {
  pageUrl: string;
  userAgent: string;
  onTime: Date;
}

@Controller('statistics')
export class AppController {
  constructor(private readonly daprClient: DaprClient) {}

  @Post('/add-page-view')
  async prderAdd(@Body() pageViewDto: PageViewDto): Promise<void> {
    try {
      console.log(pageViewDto);
      await this.daprClient.pubsub.publish('pubsub', 'page-view-add', pageViewDto);
    } catch (e) {
      console.log(e);
    }
  }
}
