import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Council, Prisma } from '@prisma/client';
const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

// Exclude keys from user
// via https://www.prisma.io/docs/concepts/components/prisma-client/excluding-fields
function exclude<Council, Key extends keyof Council>(
  council: Council,
  keys: Key[]
): Omit<Council, Key> {
  for (let key of keys) {
    delete council[key]
  }
  return council
}

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
    const council = await this.prisma.council.findUnique({
      where: councilWhereUniqueInput,
    });
    const councilWithoutSecret = exclude(council, ['secret']);
    return council;
  }

  async createCouncil(council: Prisma.CouncilCreateInput): Promise<Council> {
    const data = {
      ...council,
      id: genRanHex(8),
      secret: genRanHex(8)
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
    
    const council = await this.prisma.council.findUnique({
      where
    });
    if(council.secret === data.secret) {
      // TODO: Check if the edit property matches first!
      return this.prisma.council.update({
        data,
        where,
      });
    } else {
      // TODO: return error.
      const error = `Unable to save Council '${where.id}'. Secret doesn't match.`
      console.log(error, {where, data});
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: error,
      }, HttpStatus.FORBIDDEN);
    }
  }

  async deleteCouncil(where: Prisma.CouncilWhereUniqueInput): Promise<Council> {
    // TODO: Check if the edit property matches first!
    return this.prisma.council.delete({
      where,
    });
  }
}
