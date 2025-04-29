import { Injectable } from '@nestjs/common';
import { CreateWalletUseCase } from './use-cases/create-wallet.usecase';
import { GetWalletUseCase } from './use-cases/get-wallet.useCase';
import { GetBalanceUseCase } from './use-cases/get-balance.usecase';
import { ValidateBalanceUseCase } from './use-cases/validate-balance.usecase';
import { CreateWalletDto } from './dto/create-wallet.dto';

@Injectable()
export class WalletService {
  constructor(
    private readonly createWalletUseCase: CreateWalletUseCase,
    private readonly getWalletUseCase: GetWalletUseCase,
    private readonly getBalanceUseCase: GetBalanceUseCase,
    private readonly validateBalanceUseCase: ValidateBalanceUseCase
  ) {}

  async createWallet(dto: CreateWalletDto) {
    return this.createWalletUseCase.execute(dto);
  }

  async getBalance(userId: number) {
    return this.getBalanceUseCase.execute(userId);
  }

  async validateBalance(userId: number, amount: number) {
    return this.validateBalanceUseCase.execute(userId, amount);
  }
}