import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CouncilsController } from './councils.controller';
import { CouncilsService } from './councils.service';

@Module({
  imports: [],
  controllers: [CouncilsController],
  providers: [CouncilsService, PrismaService],
})
export class CouncilsModule {}
