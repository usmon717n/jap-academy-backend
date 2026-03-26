import { IsString, IsOptional, MinLength } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @MinLength(2)
  fullName: string;

  @IsString()
  @MinLength(9)
  phone: string;

  @IsOptional()
  @IsString()
  message?: string;
}
