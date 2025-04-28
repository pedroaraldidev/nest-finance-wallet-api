import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ITransactionRepository } from '../transaction.repository.interface';
import { Transaction, TransactionStatus } from '../../entities/transaction.entity';

@Injectable()
export class TransactionTypeOrmRepository implements ITransactionRepository {
  constructor(
    @InjectRepository(Transaction)
    private readonly repository: Repository<Transaction>,
  ) {}

  async create(transaction: Partial<Transaction>): Promise<Transaction> {
    return this.repository.save(transaction);
  }

  async findByTransactionId(transactionId: number): Promise<Transaction | null> {
    return this.repository.findOne({ where: {id: transactionId } });
  }

  async updateStatus(
    transactionId: number,
    status: TransactionStatus,
    reversalReason?: string,
  ): Promise<Transaction> {
    await this.repository.update(
      { id: transactionId },
      { status, ...(reversalReason && { reversalReason }) },
    );
    return this.findByTransactionId(transactionId);
  }
}