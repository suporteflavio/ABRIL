import { IsNotEmpty, IsString, Matches, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'CPF (only digits)', example: '12345678901' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{11}$/, { message: 'CPF must be exactly 11 digits (no punctuation)' })
  cpf: string;

  @ApiProperty({ description: 'User password' })
  @IsNotEmpty()
  @IsString()
  @Length(6, 128)
  password: string;

  @ApiProperty({ description: 'Tenant ID (UUID)', required: false })
  @IsString()
  tenantId?: string;
}
