import { IsString, IsInt, Min, Max, IsOptional, IsUUID } from 'class-validator';

export class CreateQuestionDto {
  @IsUUID()
  topicId: string;

  @IsString()
  text: string;

  @IsString()
  optionA: string;

  @IsString()
  optionB: string;

  @IsString()
  optionC: string;

  @IsString()
  optionD: string;

  @IsInt()
  @Min(0)
  @Max(3)
  correct: number;
}

export class UpdateQuestionDto {
  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  @IsString()
  optionA?: string;

  @IsOptional()
  @IsString()
  optionB?: string;

  @IsOptional()
  @IsString()
  optionC?: string;

  @IsOptional()
  @IsString()
  optionD?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(3)
  correct?: number;
}
