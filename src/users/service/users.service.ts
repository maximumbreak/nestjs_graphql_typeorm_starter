import { Injectable } from '@nestjs/common'
import * as crypto from 'crypto'
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
  ENCRYPTION_KEY = config.ENCRYPTION_KEY // Must be 256 bits (32 characters)
  IV_LENGTH = 16 // For AES, this is always 16

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
    const salt = await bcrypt.genSalt()
    const key = (await promisify(crypto.scrypt)(
      this.ENCRYPTION_KEY,
      salt,
      32,
    )) as Buffer
    // const cipher = createCipheriv('aes-256-ctr', key, iv)

    // const textToEncrypt = 'Nest'
    // const encryptedText = Buffer.concat([
    //   cipher.update(textToEncrypt),
    //   cipher.final(),
    // ])
    const saltOrRounds = 10
    const encryptedText = this.encrypt(input.password, key)

    const hash = await bcrypt.hash(encryptedText, saltOrRounds)

    const newUser: UsersEntity = await this.usersRepository.create({
      id: uuidv4(),
      ...input,
      password: hash,
      salt,
    })
    this.usersRepository.save({ ...newUser })

    return newUser
  }

  encrypt(text: string, key: Buffer) {
    let iv = crypto.randomBytes(this.IV_LENGTH)
    let cipher = crypto.createCipheriv('aes-256-ctr', key, iv)
    let encrypted = cipher.update(text)

    encrypted = Buffer.concat([encrypted, cipher.final()])

    return iv.toString('hex') + ':' + encrypted.toString('hex')
  }

  async decrypt(text: string, salt: string) {
    let iv = crypto.randomBytes(this.IV_LENGTH)
    const key = (await promisify(crypto.scrypt)(
      this.ENCRYPTION_KEY,
      salt,
      32,
    )) as Buffer
    let textParts = text.split(':')
    let encryptedText = Buffer.from(textParts.join(':'), 'hex')
    let decipher = crypto.createDecipheriv('aes-256-ctr', key, iv)
    let decrypted = decipher.update(encryptedText)

    decrypted = Buffer.concat([decrypted, decipher.final()])

    return decrypted.toString()
  }
}
