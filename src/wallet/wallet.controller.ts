import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get(':userId/balance')
  async getBalance(@Param('userId') userId: number) {
    return { balance: this.walletService.getBalance(userId) };
  }
}
