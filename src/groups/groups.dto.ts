import { IsString, IsOptional, IsUUID, MaxLength } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  color?: string;
}

export class AssignDto {
  @IsUUID()
  userId: string;
}
