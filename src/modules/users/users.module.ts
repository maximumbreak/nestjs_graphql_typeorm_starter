import { Module } from '@nestjs/common'
import { UsersResolver } from './users.resolver'
import { UsersService } from './service/users.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersRepository } from './repository/user.repository'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from 'src/auth/constants'
import { PassportModule } from '@nestjs/passport'
import { TokenService } from './service/token.service'
import { TokenRepository } from './repository/token.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository, TokenRepository]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '5m',
      },
    }),
  ],
  providers: [UsersResolver, UsersService, TokenService],
  exports: [UsersService, TokenService],
})
export class UsersModule {}
