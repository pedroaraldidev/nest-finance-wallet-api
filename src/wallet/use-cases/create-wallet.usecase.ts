import { Inject, Injectable } from '@nestjs/common';
import { IWalletRepository } from '../repositories/wallet.repository.interface';
import { CreateWalletDto } from '../dto/create-wallet.dto';
import { Wallet } from '../entities/wallet.entity';

@Injectable()
export class CreateWalletUseCase {
  constructor(
    @Inject(IWalletRepository)
    private readonly walletRepository: IWalletRepository,
  ) {}

  async execute(dto: CreateWalletDto): Promise<Wallet> {
    return this.walletRepository.create({
      userId: dto.userId,
      balance: dto.initialBalance || 1000,
    });
  }
}