import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { InputCreateUsersDto } from './dto/input-users.dto'
import { TokensEntity } from './entity/token.entity'
import { UsersEntity } from './entity/users.entity'
import { UsersService } from './service/users.service'
import { JwtService } from '@nestjs/jwt'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from 'src/auth/gql-auth.guard'
import { User } from 'src/auth/auth.decorator'
import { Role } from 'src/auth/role.enum'
import { Roles } from 'src/auth/roles.decorator'
import { RolesGuard } from 'src/auth/roles.guard'
import { createDecipheriv, randomBytes, scrypt } from 'crypto'
import { promisify } from 'util'
import * as bcrypt from 'bcrypt'

@Resolver('Users')
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query((returns) => UsersEntity)
  async getUsers(
    @User() user: UsersEntity,
    @Args('email')
    email: string,
  ): Promise<UsersEntity> {
    return this.usersService.findUserByEmail(email)
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Query((returns) => UsersEntity)
  async getUsersFromAdmin(
    @User() user: UsersEntity,
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

  @Mutation((returns) => TokensEntity)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<TokensEntity> {
    const user = await this.usersService.findUserByEmail(email)
    const isMatch = await bcrypt.compare(password, user.password)
    const payload = { userId: user.id, sub: user.id }
    if (isMatch) {
      return {
        userId: user.id,
        accessToken: this.jwtService.sign(payload),
      }
    }
    throw new Error('Email or Password incorrect')
  }
}
