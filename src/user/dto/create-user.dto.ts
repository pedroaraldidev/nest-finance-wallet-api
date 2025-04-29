import { IsString, IsEmail, IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  document: string;

  @IsString()
  @IsNotEmpty()
  document_type: string;

  @IsDateString()
  @IsNotEmpty()
  birth_date: Date;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  user_type?: string;
}
