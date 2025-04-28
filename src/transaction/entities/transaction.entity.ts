import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Wallet } from '../../wallet/entities/wallet.entity';

export enum TransactionStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  REVERTED = 'reverted',
  FAILED = 'failed',
}

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  amount: number;

  @Column()
  senderWalletId: number;

  @Column()
  receiverWalletId: number;

  @Column({
    type: 'varchar',
    length: 20, 
    default: TransactionStatus.PENDING,
  })
  status: TransactionStatus;

  @Column({ nullable: true })
  reversalReason: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => Wallet, wallet => wallet.sentTransactions)
  senderWallet: Wallet;

  @ManyToOne(() => Wallet, wallet => wallet.receivedTransactions)
  receiverWallet: Wallet;
}