import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { IWalletRepository } from '../repositories/wallet.repository.interface';

@Injectable()
export class GetBalanceUseCase {
  constructor(
    @Inject(IWalletRepository)
    private readonly walletRepository: IWalletRepository,
  ) {}

  async execute(userId: number): Promise<number> {
    const wallet = await this.walletRepository.findByUserId(userId);
    if (!wallet) {
      throw new BadRequestException('Wallet not found');
    }
    return wallet.balance;
  }
}
