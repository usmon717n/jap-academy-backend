import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ResultsService } from './results.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AdminGuard } from '../common/guards/admin.guard';
import { SubmitResultDto } from './results.dto';

@ApiTags('Results')
@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('submit')
  async submit(@Request() req: any, @Body() dto: SubmitResultDto) {
    return this.resultsService.submit({
      userId: req.user.sub,
      topicId: dto.topicId,
      answers: dto.answers,
      timeSpent: dto.timeSpent,
    });
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('my')
  async myResults(@Request() req: any) {
    return this.resultsService.findByUser(req.user.sub);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get('all')
  async allResults() {
    return this.resultsService.findAll();
  }
}
