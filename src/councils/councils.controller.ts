import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { CouncilsService } from './councils.service';
import { Council as CouncilModel } from '@prisma/client';

@Controller('councils')
export class CouncilsController {
  constructor(private councilsService: CouncilsService) {}

  @Get()
  async getCouncils() {
    const councils = await this.councilsService.councils({});
    return councils;
  }

  @Get(':councilID')
  async getCouncil(
    @Param('councilID') councilID: string,
  ): Promise<CouncilModel | null> {
    console.log('GET: getCouncil', councilID);

    const council = await this.councilsService.council({
      id: String(councilID),
    });
    return council;
  }

  @Post()
  // @UsePipes(ValidationPipe)
  async addCouncil(@Body() councilData: CouncilModel) {
    console.log('POST: addCouncil', councilData);
    const council = await this.councilsService.createCouncil(councilData);
    return council;
  }

  @Put(':id')
  async updateCouncil(
    @Param('id') id: string,
    @Body() councilData: CouncilModel,
  ): Promise<CouncilModel> {
    return this.councilsService.updateCouncil({
      where: { id: String(id) },
      data: councilData,
    });
  }

  @Delete(':councilID')
  async deleteCouncil(@Param('councilID') councilID: string) {
    const councils = await this.councilsService.deleteCouncil({
      id: String(councilID),
    });
    return councils;
  }
}
