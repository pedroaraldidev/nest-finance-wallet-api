import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { IWalletRepository } from '../repositories/wallet.repository.interface';
import { Wallet } from '../entities/wallet.entity';

@Injectable()
export class GetWalletUseCase {
  constructor(
    @Inject(IWalletRepository)
    private readonly walletRepository: IWalletRepository,
  ) {}

  async execute(userId: number): Promise<Wallet> {
    const wallet = await this.walletRepository.findByUserId(userId);
    if (!wallet) {
      throw new BadRequestException('Wallet not found');
    }
    return wallet;
  }
}
