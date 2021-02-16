import { Field, InputType } from '@nestjs/graphql'

@InputType('InputCreateUsers')
export class InputCreateUsersDto {
  @Field((type) => String)
  email: string

  @Field((type) => String)
  firstName: string

  @Field((type) => String)
  lastName: string

  @Field((type) => String)
  password: string

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
