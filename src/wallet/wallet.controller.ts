import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  async create(@Body() dto: CreateWalletDto) {
    return this.walletService.createWallet(dto);
  }

  @Get(':userId/balance')
  async getBalance(@Param('userId') userId: number) {
    return this.walletService.getBalance(userId);
  }
}