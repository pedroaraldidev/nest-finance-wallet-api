import * as bcrypt from 'bcrypt';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto/login.dto';
import { IUserRepository } from '../../user/repositories/user.repository.interface';
import { ITokenRepository } from '../repositories/token.repository.interface';


@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(IUserRepository) private readonly userRepository: IUserRepository,
    @Inject(ITokenRepository) private tokenRepository: ITokenRepository,
    private jwtService: JwtService,
  ) {}

  async execute(loginDto: LoginDto) {
    const user = await this.userRepository.findByEmail(loginDto.email);
    
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);

    await this.tokenRepository.create({
      token,
      expires_at: new Date(Date.now() + 3600 * 1000),
      user_id: user.id,
    });

    return { access_token: token };
  }
}