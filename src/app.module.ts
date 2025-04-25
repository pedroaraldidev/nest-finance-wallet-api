import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import typeormConfig from './config/typeorm.config';

const validDbTypes = ['mysql', 'postgres', 'sqlite'] as const;

console.log(typeormConfig)

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
