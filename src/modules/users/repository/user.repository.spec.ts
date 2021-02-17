import { UsersRepository } from './user.repository'

describe('UserRepository', () => {
  it('should be defined', () => {
    expect(new UsersRepository()).toBeDefined()
  })
})
