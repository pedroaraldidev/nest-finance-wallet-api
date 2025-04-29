import { Injectable, Inject, BadRequestException } from '@nestjs/common';
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
    private readonly getWalletUseCase: GetWalletUseCase,
  ) {}

  async execute(dto: CreateTransactionDto, userId: number) {
    await this.validateBalanceUseCase.execute(userId, dto.amount);

    const wallet: Wallet = await this.getWalletUseCase.execute(userId);
    if (wallet.id === dto.receiverWalletId) {
        throw new BadRequestException('You cannot transfer to yourself!');
    }
    return this.transactionRepository.create({
      ...dto,
      senderWalletId: wallet.id,
    });
  }
}
