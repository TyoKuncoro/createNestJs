import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reviews } from './entities/reviews.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto'
import { UsersService } from '#/users/users.service';
import { HttpStatus } from '@nestjs/common';
import { error } from 'console';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
    constructor(
        @InjectRepository(Reviews)
        private reviewsRepository: Repository<Reviews>,
        private userService: UsersService
    ){}

    findAll(){
        return this.reviewsRepository.findAndCount({
            relations: {trainee: true}
        });
    }

    async findOneById(id: string){
        try {
            return await this.reviewsRepository.findOneOrFail({
                where: {id},
                relations: {trainee: true}
            })
        } catch (e) {
            if (e instanceof EntityNotFoundError){
                throw new HttpException(
                    {
                        statusCode: HttpStatus.NOT_FOUND,
                        error: "data not found",
                    },
                    HttpStatus.NOT_FOUND
            )
            } else {
                throw e
            }
        }
    }

    async create(createReviewDto: CreateReviewDto){
        try {
            // cek user id is valid
            const findOneUserId = await this.userService.findOne(createReviewDto.userId)

            //kalau valid kita baru create review
            const reviewEntity = new Reviews
            reviewEntity.lastName = createReviewDto.lastName
            reviewEntity.userId = createReviewDto.userId
            reviewEntity.reviews = createReviewDto.reviews
            reviewEntity.trainee = findOneUserId

            const insertReview = await this.reviewsRepository.insert(reviewEntity)
            return await this.reviewsRepository.findOneOrFail({
                where: {
                    id: insertReview.identifiers[0].id
                }
            })
        } catch (e) {
            throw e
        }

    }

    async update(id: string, updateReviewDto:UpdateReviewDto){
        try {
            //cari idnya valid atau tidak
            console.log("test");
            await this.findOneById(id)

            //kalau valid update datanya
            const reviewEntity = new Reviews
            reviewEntity.lastName = updateReviewDto.lastName
            reviewEntity.reviews = updateReviewDto.reviews

            await this.reviewsRepository.update(id, reviewEntity)

            //return data setelah diupdate
            return await this.reviewsRepository.findOneOrFail({
                where:{
                    id
                }
            })
        } catch (e) {
            throw e
        }
    }

    async softDeleteById(id: string){
        try {
            //cari dulu id valid atau tidak
            await this.findOneById(id)

            //kalau menemukan lalu delete
            await this.reviewsRepository.softDelete(id)

            return "success"
        } catch (e) {
            throw e
        }
    }
}
