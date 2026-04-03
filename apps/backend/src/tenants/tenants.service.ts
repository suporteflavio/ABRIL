import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class TenantsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.tenant.findMany({ where: { isActive: true } });
  }

  async findOne(id: string) {
    return this.prisma.tenant.findUnique({ where: { id } });
  }
}
