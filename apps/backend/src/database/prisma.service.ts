import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async setTenantContext(tenantId: string): Promise<void> {
    await this.$executeRaw`SELECT set_config('app.current_tenant', ${tenantId}, false)`;
  }

  async setUserRoleContext(role: string): Promise<void> {
    await this.$executeRaw`SELECT set_config('app.current_user_role', ${role}, false)`;
  }
}
