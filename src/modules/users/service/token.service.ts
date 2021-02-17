import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { SignOptions } from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import { TokensEntity } from '../entity/token.entity'
import { UsersEntity } from '../entity/users.entity'
import { TokenRepository } from '../repository/token.repository'

@Injectable()
export class TokenService {
  constructor(
    private readonly tokenRepository: TokenRepository,
    public jwt: JwtService,
  ) {}

  public async createRefreshToken(
    user: UsersEntity,
    tokenId: string,
    refreshToken: string,
    ttl: number,
  ): Promise<TokensEntity> {
    const token = new TokensEntity()
    token.id = tokenId
    token.userId = user.id
    token.isRevoked = false
    token.refreshToken = refreshToken

    const expiration = new Date()
    expiration.setTime(expiration.getTime() + ttl)

    token.expires = expiration

    return this.tokenRepository.save({ ...token })
  }

  public async findTokenById(id: number): Promise<TokensEntity | null> {
    return this.tokenRepository.findOne({
      where: {
        id,
      },
    })
  }

  public async generateRefreshToken(
    user: UsersEntity,
    expiresIn: number,
  ): Promise<string> {
    const tokenId = uuidv4()
    const opts: SignOptions = {
      expiresIn,
      subject: String(user.id),
      jwtid: tokenId,
    }
    const refreshToken = await this.jwt.signAsync({}, opts)
    await this.createRefreshToken(user, tokenId, refreshToken, expiresIn)

    return refreshToken
  }
}
