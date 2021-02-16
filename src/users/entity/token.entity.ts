import { Field, ID, ObjectType } from '@nestjs/graphql'
import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm'

@Entity('Tokens')
@ObjectType()
export class TokensEntity {
  @PrimaryColumn()
  @Field((type) => ID)
  id?: string

  @Column()
  @Field((type) => String)
  userId: string

  @Column()
  @Field((type) => String)
  accessToken: string

  @Column()
  @Field((type) => String)
  refreshToken?: string

  @CreateDateColumn({ type: 'timestamp' })
  @Field((type) => String)
  created?: Date

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  @Field((type) => String)
  updated?: Date
}
