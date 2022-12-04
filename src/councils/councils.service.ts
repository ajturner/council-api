import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Council, Prisma } from '@prisma/client';
const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

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

  async createCouncil(council: Prisma.CouncilCreateInput): Promise<Council> {
    const data = {
      id: genRanHex(8),
      ...council
    };
    console.log("createCouncil", {data})
    return this.prisma.council.create({
      data
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
