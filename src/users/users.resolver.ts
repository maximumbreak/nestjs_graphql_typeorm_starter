import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { InputCreateUsersDto } from './dto/input-users.dto'
import { UsersEntity } from './entity/users.entity'
import { Users } from './models/users.model'
import { UsersService } from './service/users.service'

@Resolver('Users')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query((returns) => UsersEntity)
  async getUsers(
    @Args('email')
    email: string,
  ): Promise<UsersEntity> {
    return this.usersService.findUserByEmail(email)
  }

  @Mutation((returns) => UsersEntity)
  async createUser(
    @Args('input') input: InputCreateUsersDto,
  ): Promise<UsersEntity> {
    return this.usersService.insertUser(input)
  }
}
