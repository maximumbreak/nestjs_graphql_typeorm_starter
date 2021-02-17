import { EntityRepository, Repository } from 'typeorm'
import { TokensEntity } from '../entity/token.entity'

@EntityRepository(TokensEntity)
export class TokenRepository extends Repository<TokensEntity> {}
