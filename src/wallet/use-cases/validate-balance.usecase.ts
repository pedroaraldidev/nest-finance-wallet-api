import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { IWalletRepository } from '../repositories/wallet.repository.interface';

@Injectable()
export class ValidateBalanceUseCase {
  constructor(
    @Inject(IWalletRepository)
    private readonly walletRepository: IWalletRepository,
  ) {}

  async execute(walletId: number, amount: number): Promise<boolean> {
    const wallet = await this.walletRepository.findByUserId(walletId);

    if (!wallet) {
        throw new BadRequestException('Wallet not found!');
    }

    if (wallet.balance < amount) {
        throw new BadRequestException('Insufficient balance for this transaction');
    }

    return true;
  }
}
