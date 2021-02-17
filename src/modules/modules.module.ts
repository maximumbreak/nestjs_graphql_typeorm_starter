import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'

@Module({})
export class ModulesModule {
  imports: [UsersModule]
}
