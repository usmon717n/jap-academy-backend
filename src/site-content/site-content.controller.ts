import { Controller, Get, Put, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { SiteContentService } from './site-content.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AdminGuard } from '../common/guards/admin.guard';

@ApiTags('Site Content')
@Controller('site-content')
export class SiteContentController {
  constructor(private readonly siteContentService: SiteContentService) {}

  @Get()
  async getAll() {
    return this.siteContentService.getAll();
  }

  @Get(':key')
  async get(@Param('key') key: string) {
    return this.siteContentService.get(key);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Put(':key')
  async set(@Param('key') key: string, @Body() body: { value: any }) {
    return this.siteContentService.set(key, body.value);
  }
}
