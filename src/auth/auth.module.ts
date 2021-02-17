import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtStrategy } from './jwt.strategy'
import { UsersModule } from '../modules/users/users.module'
import { UsersRepository } from '../modules/users/repository/user.repository'

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository]), UsersModule],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
