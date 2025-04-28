import { IsNumber, IsString, IsDate } from 'class-validator';

export class TransactionResponseDto {
  @IsNumber()
  transactionId: number;

  @IsNumber()
  amount: number;

  @IsString()
  status: string;

  @IsDate()
  createdAt: Date;
}