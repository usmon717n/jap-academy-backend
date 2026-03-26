import { IsUUID, IsInt, IsObject, Min } from 'class-validator';

export class SubmitResultDto {
  @IsUUID()
  topicId: string;

  @IsObject()
  answers: Record<string, number>;

  @IsInt()
  @Min(0)
  timeSpent: number;
}
