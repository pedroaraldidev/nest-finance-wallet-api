import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { User } from '../auth/decorators/user.decorator';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a transaction' })
  @ApiBearerAuth()
  @ApiBody({
    description: 'Request body to create a new transaction',
    schema: {
      type: 'object',
      properties: {
        amount: { type: 'number', example: 1000 },
        receiverWalletId: { type: 'number', example: 2 },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Transaction completed successfully!',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error in the request',
  })
  async create(@Body() dto: CreateTransactionDto, @User('id') userId: number) {
    await this.transactionService.createTransaction(dto, userId);
    return { message: 'Transaction completed successfully!' };
  }
}
