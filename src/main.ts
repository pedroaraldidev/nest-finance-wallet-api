import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from './user/user.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //cria o usuario admin para fim de testes
  const userService = app.get(UserService);
  await userService.create({
    name: 'Admin',
    email: 'admin@admin.com',
    document: '00000000',
    document_type: 'F',
    birth_date: new Date('2020-09-01'),
    password: '12345',
    user_type: 'admin'
  });

  const config = new DocumentBuilder()
    .setTitle('Finance Wallet API')
    .setDescription('API de autenticação e gestão de carteiras')
    .setVersion('1.0')
    .addBearerAuth() 
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
