import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CouncilsModule } from './councils/councils.module';

@Module({
  imports: [CouncilsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
