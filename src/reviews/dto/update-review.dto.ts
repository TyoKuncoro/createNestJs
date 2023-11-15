import { IsNotEmpty, IsInt } from 'class-validator';

export class UpdateReviewDto {

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  reviews: string;

}
