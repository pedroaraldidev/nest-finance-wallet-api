import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../repositories/user.repository.interface';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User, UserDocumentType, UserStatus } from '../entities/user.entity';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findById(id);
    const user_document_type = updateUserDto.document_type  || user.document_type;
    const user_status = updateUserDto.status || user.status;
    user.name = updateUserDto.name || user.name;
    user.email = updateUserDto.email || user.email;
    user.document = updateUserDto.document || user.document;
    user.document_type = user_document_type as UserDocumentType;
    user.birth_date = updateUserDto.birth_date || user.birth_date;
    user.status = user_status as UserStatus;
    return this.userRepository.update(id, user);
  }
}
