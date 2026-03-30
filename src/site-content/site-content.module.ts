import { Module } from '@nestjs/common';
import { SiteContentService } from './site-content.service';
import { SiteContentController } from './site-content.controller';

@Module({
  controllers: [SiteContentController],
  providers: [SiteContentService],
})
export class SiteContentModule {}
