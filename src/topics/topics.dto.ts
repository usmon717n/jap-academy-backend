import { IsString, IsOptional, IsBoolean, MaxLength } from 'class-validator';

export class CreateTopicDto {
  @IsString()
  name: string;

  @IsString()
  @MaxLength(4)
  symbol: string;

  @IsString()
  @MaxLength(4)
  number: string;

  @IsString()
  @MaxLength(10)
  color: string;
}

export class UpdateTopicDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(4)
  symbol?: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  color?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
