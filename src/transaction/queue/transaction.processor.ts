import { Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job } from 'bull';
import { ProcessTransactionUseCase } from '../use-cases/process-transaction.usecase';

@Processor('transactions')
@Injectable()
export class TransactionProcessor {
  constructor(
    private readonly processTransactionUseCase: ProcessTransactionUseCase,
  ) {}

  @Process('process')
  async handleProcess(job: Job<{ transactionId: number }>) {
    return this.processTransactionUseCase.execute(job.data.transactionId);
  }
}