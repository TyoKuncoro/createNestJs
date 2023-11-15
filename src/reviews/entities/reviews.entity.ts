import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    VersionColumn,
    CreateDateColumn,
    ManyToOne,
  } from 'typeorm';
import { User } from '#/users/entities/user.entity';

  
  @Entity()
  export class Reviews {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, (user) => user.reviews)
    trainee: User;
      
    @Column()
    lastName: string;

    @Column()
    reviews: string;
  
    @Column({ default: true })
    isActive: boolean;

    @Column()
    userId: string;
  
    @CreateDateColumn({
      type: 'timestamp with time zone',
      nullable: false,
    })
    createdAt: Date;
  
    @UpdateDateColumn({
      type: 'timestamp with time zone',
      nullable: false,
    })
    updatedAt: Date;
  
    @DeleteDateColumn({
      type: 'timestamp with time zone',
      nullable: true,
    })
    deletedAt: Date;
    }
  