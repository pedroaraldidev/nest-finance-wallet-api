import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './entities/wallet.entity';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { WalletTypeOrmRepository } from './repositories/typeorm/wallet.typeorm.repository';
import { CreateWalletUseCase } from './use-cases/create-wallet.usecase';
import { GetBalanceUseCase } from './use-cases/get-balance.usecase';
import { IWalletRepository } from './repositories/wallet.repository.interface';
import { ValidateBalanceUseCase } from './use-cases/validate-balance.usecase';
import { GetWalletUseCase } from './use-cases/get-wallet.useCase';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet])],
  controllers: [WalletController],
  providers: [
    WalletService,
    CreateWalletUseCase,
    GetWalletUseCase,
    GetBalanceUseCase,
    ValidateBalanceUseCase,
    {
      provide: IWalletRepository,
      useClass: WalletTypeOrmRepository,
    },
  ],
  exports: [
    {
      provide: IWalletRepository,
      useClass: WalletTypeOrmRepository,
    },
    WalletService,
    GetWalletUseCase
  ],
})
export class WalletModule {}
