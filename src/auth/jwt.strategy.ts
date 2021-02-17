import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { jwtConstants } from './constants'
import { UsersService } from '../modules/users/service/users.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    })
  }

  async validate(payload: any) {
    const user = await this.userService.findUserById(payload.userId)
    if (user) {
      return { ...user }
    } else {
      throw new UnauthorizedException()
    }
  }
}
