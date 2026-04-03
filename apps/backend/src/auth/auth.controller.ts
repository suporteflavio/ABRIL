import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: { cpf: string; password: string; tenantId: string }) {
    return this.authService.login(body.cpf, body.password, body.tenantId);
  }
}
