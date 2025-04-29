import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { WalletService } from './wallet.service';
import { User } from '../auth/decorators/user.decorator';

@ApiTags('Wallet') 
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get('/balance')
  @ApiOperation({ summary: 'Get wallet balance' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Wallet balance recovered successfully',
    schema: {
      type: 'object',
      properties: {
        balance: { type: 'number', example: 100.50 },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Token not found!',
  })
  async getBalance(@User('id') userId: number) {
    return { balance: await this.walletService.getBalance(userId) };
  }
}
