import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class TokensDto {
  @Field((type) => String)
  userId: string

  @Field((type) => String)
  accessToken?: string

  @Field((type) => String)
  refreshToken?: string

  @Field((type) => String)
  tokenType?: string

  @Field((type) => Number)
  expireIn?: number
}
