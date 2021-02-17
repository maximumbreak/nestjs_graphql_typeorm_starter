import { Injectable } from '@nestjs/common'
import * as crypto from 'crypto'
import * as CryptoJS from 'crypto-js'
import { promisify } from 'util'
import * as bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import { InputCreateUsersDto } from '../dto/input-users.dto'
import { UsersEntity } from '../entity/users.entity'
import { UsersRepository } from '../repository/user.repository'
import { EnvService } from 'src/env/env.service'

const config = new EnvService().read()

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
    const saltOrRounds = 10
    const hash = await bcrypt.hash(input.password, saltOrRounds)

    const newUser: UsersEntity = await this.usersRepository.create({
      id: uuidv4(),
      ...input,
      password: hash,
    })
    this.usersRepository.save({ ...newUser })

    return newUser
  }
}
