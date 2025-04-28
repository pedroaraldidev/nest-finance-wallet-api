import { Injectable, Inject } from '@nestjs/common';
import { ITransactionRepository } from '../repositories/transaction.repository.interface';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { ValidateBalanceUseCase } from '../../wallet/use-cases/validate-balance.usecase'; 

@Injectable()
export class CreateTransactionUseCase {
  constructor(
    @Inject(ITransactionRepository)
    private readonly transactionRepository: ITransactionRepository,
    private readonly validateBalanceUseCase: ValidateBalanceUseCase
  ) {}

  async execute(dto: CreateTransactionDto) {
    await this.validateBalanceUseCase.execute(dto.senderWalletId, dto.amount);
    return this.transactionRepository.create(dto);
  }
}