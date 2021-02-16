import { Injectable } from '@nestjs/common'
import { v4 as uuidv4 } from 'uuid'
import { InputCreateUsersDto } from '../dto/input-users.dto'
import { UsersEntity } from '../entity/users.entity'
import { UsersRepository } from '../repository/user.repository'

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findUserById(id: string): Promise<UsersEntity> {
    return await this.usersRepository.findOne({
      where: {
        id,
      },
    })
  }

  async findUserByEmail(email: string): Promise<UsersEntity> {
    return await this.usersRepository.findOne({
      where: {
        email,
      },
    })
  }

  async insertUser(input: InputCreateUsersDto): Promise<UsersEntity> {
    const { email }: { email: string } = input
    const userExists: UsersEntity = await this.usersRepository.findOne({
      where: {
        email,
      },
    })

    if (userExists) {
      throw new Error(`E-mail ${email} is already in use.`)
    }

    const newUser: UsersEntity = await this.usersRepository.create({
      id: uuidv4(),
      ...input,
    })
    this.usersRepository.save({ ...newUser })

    return newUser
  }
}
