import { Injectable } from '@nestjs/common'
import { UsersRepository } from 'src/modules/users/repository/user.repository'

@Injectable()
export class AuthService {
  constructor(private usersRepository: UsersRepository) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    })
    // if (user && user.password !== pass) {
    //   const { password, ...result } = user
    //   return result
    // }
    return user
  }
}
