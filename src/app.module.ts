import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GraphQLModule } from '@nestjs/graphql'
import { UsersModule } from './users/users.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EnvModule } from './env/env.module'
import { EnvService } from './env/env.service'
import { UsersEntity } from './users/entity/users.entity'
import { AuthModule } from './auth/auth.module'
import { APP_GUARD } from '@nestjs/core'
import { RolesGuard } from './auth/roles.guard'

const config = new EnvService().read()

@Module({
  imports: [
    EnvModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
      debug: false,
      playground: true,
    }),
    TypeOrmModule.forRoot({
      type: config.DB_TYPE,
      host: config.DB_HOST,
      port: config.DB_PORT,
      username: config.DB_USER,
      password: config.DB_PASSWORD,
      database: config.DB_NAME,
      synchronize: config.DB_SYNC,
      entities: [UsersEntity],
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ],
})
export class AppModule {}
