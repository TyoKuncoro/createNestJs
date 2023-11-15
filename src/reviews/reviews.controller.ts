import { Controller, Get, Post, Put, Delete, Body, Param, ParseUUIDPipe, HttpStatus } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { HttpStatusCode } from 'axios';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('reviews')
export class ReviewsController {
    constructor(
        private reviewsService: ReviewsService
    ){}

    @Get()
    async getAll(){
        const [data, count] = await this.reviewsService.findAll();

        return {
            data,
            count,
            statusCode: HttpStatusCode.Ok,
            message: "success"
        }
    }

    @Post()
    async create(@Body() createReviewDto: CreateReviewDto){
        const data = await this.reviewsService.create(createReviewDto);
        
        return{
            data,
            statusCode: HttpStatusCode.Created,
            message: "success"
        }
    }

    @Put("/:id")
    async update(@Param("id", ParseUUIDPipe) id: string, @Body() updateReviewDto: UpdateReviewDto){
        const data = await this.reviewsService.update(id, updateReviewDto)

        return {
            data,
            statusCode: HttpStatus.OK,
            message: "success"
        }
    }

    @Delete(":id")
    async softDelete(@Param("id", ParseUUIDPipe) id: string){
        return {
            statusCode: HttpStatus.OK,
            message: await this.reviewsService.softDeleteById(id)
        }
    }
}
