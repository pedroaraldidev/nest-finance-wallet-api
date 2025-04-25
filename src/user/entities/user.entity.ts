import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Exclude } from 'class-transformer';


export enum UserDocumentType {
  Personal = 'P',
  Company = 'J',
}

export enum UserStatus {
  Active = 'active',
  Inactive = 'inactive',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  document: string;

  @Column({
    type: 'text',
    default: UserDocumentType.Personal,
  })
  document_type: UserDocumentType;

  @Column()
  birth_date: Date;
  
  @Exclude()
  @Column()
  password: string;

  @Column({
    type: 'text',
    default: UserStatus.Active,
  })
  status: UserStatus;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'date',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt?: Date;
}
