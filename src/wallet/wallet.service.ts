import { Injectable } from '@nestjs/common';
import { CreateWalletUseCase } from './use-cases/create-wallet.usecase';
import { GetBalanceUseCase } from './use-cases/get-balance.usecase';
import { CreateWalletDto } from './dto/create-wallet.dto';

@Injectable()
export class WalletService {
  constructor(
    private readonly createWalletUseCase: CreateWalletUseCase,
    private readonly getBalanceUseCase: GetBalanceUseCase,
  ) {}

  async createWallet(dto: CreateWalletDto) {
    return this.createWalletUseCase.execute(dto);
  }

  async getBalance(userId: number) {
    return this.getBalanceUseCase.execute(userId);
  }
}