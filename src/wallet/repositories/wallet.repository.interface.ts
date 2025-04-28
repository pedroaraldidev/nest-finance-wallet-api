import { Wallet } from '../entities/wallet.entity';

export const IWalletRepository = Symbol('IWalletRepository');

export interface IWalletRepository {
  create(wallet: Partial<Wallet>): Promise<Wallet>;
  findByUserId(userId: number): Promise<Wallet | null>;
  updateBalance(userId: number, amount: number): Promise<Wallet>;
}