import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UsersRepository } from 'src/users/repository/user.repository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtStrategy } from './jwt.strategy'
import { UsersModule } from 'src/users/users.module'

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository]), UsersModule],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
