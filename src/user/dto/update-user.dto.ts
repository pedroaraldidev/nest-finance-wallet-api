import { IsString, IsEmail, IsDateString, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  document?: string;

  @IsString()
  @IsOptional()
  document_type?: string;

  @IsDateString()
  @IsOptional()
  birth_date?: Date;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsDateString()
  @IsOptional()
  deleted_at?: Date;
}
