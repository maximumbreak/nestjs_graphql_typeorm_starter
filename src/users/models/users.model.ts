import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Users {
  @Field((type) => ID)
  id: string

  @Field((type) => String)
  email: string

  @Field((type) => String)
  password: string

  @Field((type) => Number)
  firstName: string

  @Field((type) => String)
  lastName: string

  @Field((type) => String)
  address: string

  @Field((type) => String)
  subDistrict: string

  @Field((type) => String)
  district: string

  @Field((type) => String)
  province: string

  @Field((type) => String)
  postalCode: string
}
