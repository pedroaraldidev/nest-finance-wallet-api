import { IsNumber, IsPositive, IsNotEmpty } from 'class-validator';
export class CreateTransactionDto {

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  amount: number;

  @IsNumber()
  @IsNotEmpty()
  receiverWalletId: number;
}