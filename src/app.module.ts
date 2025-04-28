import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { WalletModule } from './wallet/wallet.module';
import { TransactionModule } from './transaction/transaction.module';
import { BullModule } from '@nestjs/bull';
import typeormConfig from './config/typeorm.config';
import redisConfig from './config/redis.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    UserModule,
    AuthModule,
    WalletModule,
    TransactionModule,
    BullModule.forRoot(redisConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
