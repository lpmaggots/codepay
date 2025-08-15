import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import { setupSwagger } from './swagger.config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  
  setupSwagger(app)

  if (process.env.NODE_ENV === 'production') {
    app.enableCors({
      origin: ['https://teste.com'],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true
    })
  } else {
    app.enableCors()
  }

  app.useGlobalPipes(new ValidationPipe())

  const config = new DocumentBuilder()
    .setTitle('CodePay API')
    .setDescription('API for the Open Banking CodePay system')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(process.env.PORT ?? 4000)
}

bootstrap()
