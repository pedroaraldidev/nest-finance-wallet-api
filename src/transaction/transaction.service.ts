import { Injectable } from '@nestjs/common';
import { CreateTransactionUseCase } from './use-cases/create-transaction.usecase';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class TransactionService {
  constructor(
    private readonly createTransactionUseCase: CreateTransactionUseCase,
    @InjectQueue('transactions') private transactionQueue: Queue,
  ) {}

  async createTransaction(dto: CreateTransactionDto) {
    const transaction = await this.createTransactionUseCase.execute(dto);
    const job = await this.transactionQueue.add('process', {
      transactionId: transaction.id,
    });
    const completedJob = await job.finished();
    return completedJob;
  }
}