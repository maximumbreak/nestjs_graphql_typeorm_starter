import { Injectable } from '@nestjs/common'
import { createCipheriv, randomBytes, scrypt } from 'crypto'
import { promisify } from 'util'
import * as bcrypt from 'bcrypt'
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

    // const iv = randomBytes(16)
    // const password = input.password

    // // The key length is dependent on the algorithm.
    // // In this case for aes256, it is 32 bytes.
    // const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer
    // const cipher = createCipheriv('aes-256-ctr', key, iv)

    // const textToEncrypt = 'Nest'
    // const encryptedText = Buffer.concat([
    //   cipher.update(textToEncrypt),
    //   cipher.final(),
    // ])

    const saltOrRounds = 10
    const hash = await bcrypt.hash(input.password, saltOrRounds)
    const salt = await bcrypt.genSalt()
    console.log(hash)

    const newUser: UsersEntity = await this.usersRepository.create({
      id: uuidv4(),
      password: hash,
      salt: salt,
      ...input,
    })
    this.usersRepository.save({ ...newUser })

    return newUser
  }
}
