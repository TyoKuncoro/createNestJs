import { IsNotEmpty } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  reviews: string;

  @IsNotEmpty()
  trainee: string
}
