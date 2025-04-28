import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { ITransactionRepository } from './repositories/transaction.repository.interface';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TransactionTypeOrmRepository } from './repositories/typeorm/transaction.typeorm.repository';
import { CreateTransactionUseCase } from './use-cases/create-transaction.usecase';
import { ProcessTransactionUseCase } from './use-cases/process-transaction.usecase';
import { WalletModule } from '../wallet/wallet.module';
import { TransactionQueueModule } from './queue/transaction.queue';
import { TransactionProcessor } from './queue/transaction.processor';
import { ValidateBalanceUseCase } from 'src/wallet/use-cases/validate-balance.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction]),
    WalletModule,
    TransactionQueueModule
  ],
  controllers: [TransactionController],
  providers: [
    TransactionService,
    CreateTransactionUseCase,
    ProcessTransactionUseCase,
    TransactionProcessor,
    ValidateBalanceUseCase,
    {
      provide: ITransactionRepository,
      useClass: TransactionTypeOrmRepository,
    },
  ],
})
export class TransactionModule {}