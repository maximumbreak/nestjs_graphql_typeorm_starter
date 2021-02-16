import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { EnvService } from './env/env.service'

const config = new EnvService().read()

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(config.APP_PORT)
}
bootstrap()
