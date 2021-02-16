import { Module } from '@nestjs/common'
import { UsersResolver } from './users.resolver'
import { UsersService } from './service/users.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersRepository } from './repository/user.repository'

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository])],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
