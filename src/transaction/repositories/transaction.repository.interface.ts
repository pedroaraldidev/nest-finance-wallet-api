import { Transaction } from '../entities/transaction.entity';
import { TransactionStatus } from '../entities/transaction.entity';

export const ITransactionRepository = Symbol('ITransactionRepository');

export interface ITransactionRepository {
  create(transaction: Partial<Transaction>): Promise<Transaction>;
  findByTransactionId(transactionId: number): Promise<Transaction | null>;
  updateStatus(
    transactionId: number,
    status?: TransactionStatus,
    reversalReason?: string,
  ): Promise<Transaction>;
}