import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository } from '../repositories/user.repository.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { WalletService } from '../../wallet/wallet.service'; // Importa o WalletService
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
    private readonly walletService: WalletService,
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const newUser = Object.assign(new User(), {
      ...createUserDto,
      password: hashedPassword,
    });
    const createdUser = await this.userRepository.create(newUser);

    await this.walletService.createWallet({userId: createdUser.id});

    return createdUser;
  }
}