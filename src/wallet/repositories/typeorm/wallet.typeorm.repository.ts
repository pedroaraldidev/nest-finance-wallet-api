import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IWalletRepository } from '../wallet.repository.interface';
import { Wallet } from '../../entities/wallet.entity';

@Injectable()
export class WalletTypeOrmRepository implements IWalletRepository {
  constructor(
    @InjectRepository(Wallet)
    private readonly repository: Repository<Wallet>,
  ) {}

  async create(wallet: Partial<Wallet>): Promise<Wallet> {
    return this.repository.save(wallet);
  }

  async findByUserId(userId: number): Promise<Wallet | null> {
    return this.repository.findOne({ where: { userId } });
  }

  async updateBalance(userId: number, amount: number): Promise<Wallet> {
    await this.repository
      .createQueryBuilder()
      .update(Wallet)
      .set({ balance: () => `balance + ${amount}` })
      .where('userId = :userId', { userId })
      .execute();

    return this.findByUserId(userId);
  }
}