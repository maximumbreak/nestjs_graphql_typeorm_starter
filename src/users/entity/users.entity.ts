import { Field, ID, ObjectType } from '@nestjs/graphql'
import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm'

@Entity('Users')
@ObjectType()
export class UsersEntity {
  @PrimaryColumn()
  @Field((type) => ID)
  id: string

  @Column()
  @Field((type) => String)
  email: string

  @Column()
  @Field((type) => String)
  password: string

  @Column()
  @Field((type) => String)
  salt: string

  @Column()
  @Field((type) => String)
  firstName: string

  @Column()
  @Field((type) => String)
  lastName: string

  @Column()
  @Field((type) => String)
  role: string

  @Column()
  @Field((type) => String)
  address: string

  @Column()
  @Field((type) => String)
  subDistrict: string

  @Column()
  @Field((type) => String)
  district: string

  @Column()
  @Field((type) => String)
  province: string

  @Column()
  @Field((type) => String)
  postalCode: string

  @CreateDateColumn({ type: 'timestamp' })
  @Field((type) => String)
  created: Date

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  @Field((type) => String)
  updated?: Date
}
