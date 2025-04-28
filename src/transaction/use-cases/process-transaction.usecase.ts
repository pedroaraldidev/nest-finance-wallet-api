import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { ITransactionRepository } from '../repositories/transaction.repository.interface';
import { IWalletRepository } from '../../wallet/repositories/wallet.repository.interface';
import { TransactionStatus } from '../entities/transaction.entity';
import { ValidateBalanceUseCase } from 'src/wallet/use-cases/validate-balance.usecase';

@Injectable()
export class ProcessTransactionUseCase {
  constructor(
    @Inject(ITransactionRepository)
    private readonly transactionRepository: ITransactionRepository,
    @Inject(IWalletRepository)
    private readonly walletRepository: IWalletRepository,
    private readonly validateBalanceUseCase: ValidateBalanceUseCase
  ) {}

  async execute(transactionId: number) {
    const transaction = await this.transactionRepository.findByTransactionId(
      transactionId,
    );

    if (!transaction || transaction.status !== 'pending') {
      throw new BadRequestException('Invalid or already processed transaction!');
    }
    await this.validateBalanceUseCase.execute(transaction.senderWalletId, transaction.amount);
    console.log('Processando', transaction)
    try {
      await this.walletRepository.updateBalance(
        transaction.senderWalletId,
        -transaction.amount,  
      );
      await this.walletRepository.updateBalance(
        transaction.receiverWalletId,
        +transaction.amount,
      );
      console.log('Transação Processada', transaction)
      return this.transactionRepository.updateStatus(
        transactionId,
        TransactionStatus.COMPLETED,
      );
    } catch (error) {
      console.log('Error', error)
      await this.transactionRepository.updateStatus(
        transactionId,
        TransactionStatus.FAILED,
        error.message,
      );
      throw new BadRequestException(error);
    }
  }
}