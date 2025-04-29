import { Controller, Post, Body } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { User } from 'src/auth/decorators/user.decorator';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  async create(@Body() dto: CreateTransactionDto, @User('id') userId: number ) {
    await this.transactionService.createTransaction(dto, userId);
    return { message: 'Transaction completed successfully!' };
  }
}