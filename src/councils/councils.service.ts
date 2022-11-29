import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Council, Prisma } from '@prisma/client';

@Injectable()
export class CouncilsService {
  constructor(private prisma: PrismaService) {}

  async councils(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CouncilWhereUniqueInput;
    where?: Prisma.CouncilWhereInput;
    orderBy?: Prisma.CouncilOrderByWithRelationInput;
  }): Promise<Council[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.council.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async council(
    councilWhereUniqueInput: Prisma.CouncilWhereUniqueInput,
  ): Promise<Council | null> {
    return this.prisma.council.findUnique({
      where: councilWhereUniqueInput,
    });
  }

  async createCouncil(data: Prisma.CouncilCreateInput): Promise<Council> {
    return this.prisma.council.create({
      data,
    });
  }

  async updateCouncil(params: {
    where: Prisma.CouncilWhereUniqueInput;
    data: Prisma.CouncilUpdateInput;
  }): Promise<Council> {
    const { where, data } = params;
    return this.prisma.council.update({
      data,
      where,
    });
  }

  async deleteCouncil(where: Prisma.CouncilWhereUniqueInput): Promise<Council> {
    return this.prisma.council.delete({
      where,
    });
  }
}
