import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':tenantId')
  findByTenant(@Param('tenantId') tenantId: string) {
    return this.usersService.findByTenant(tenantId);
  }
}
