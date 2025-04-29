import { Injectable, Inject } from '@nestjs/common';
import { ITransactionRepository } from '../repositories/transaction.repository.interface';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { ValidateBalanceUseCase } from '../../wallet/use-cases/validate-balance.usecase'; 
import { GetWalletUseCase } from 'src/wallet/use-cases/get-wallet.useCase';
import { Wallet } from 'src/wallet/entities/wallet.entity';

@Injectable()
export class CreateTransactionUseCase {
  constructor(
    @Inject(ITransactionRepository)
    private readonly transactionRepository: ITransactionRepository,
    private readonly validateBalanceUseCase: ValidateBalanceUseCase,
    private readonly getWalletUseCase: GetWalletUseCase
  ) {}

  async execute(dto: CreateTransactionDto, userId: number) {
    const wallet:Wallet = await this.getWalletUseCase.execute(userId)

    await this.validateBalanceUseCase.execute(wallet.id, dto.amount);
    
    return this.transactionRepository.create({...dto, senderWalletId: wallet.id});
  }
}