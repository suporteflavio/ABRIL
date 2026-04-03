import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class TenantsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.tenant.findMany({
      select: { id: true, name: true, slug: true, status: true, createdAt: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.tenant.findUniqueOrThrow({ where: { id } });
  }
}
