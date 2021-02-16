import { Module } from '@nestjs/common'
import { UsersResolver } from './users.resolver'
import { UsersService } from './service/users.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersRepository } from './repository/user.repository'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from 'src/auth/constants'
import { PassportModule } from '@nestjs/passport'

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
