import { Repository } from 'typeorm'
import { EntityRepository } from 'typeorm/decorator/EntityRepository'
import { UsersEntity } from '../entity/users.entity'

@EntityRepository(UsersEntity)
export class UsersRepository extends Repository<UsersEntity> {}
