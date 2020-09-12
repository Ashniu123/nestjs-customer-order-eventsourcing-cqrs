import {
  IsEmail,
  IsNotEmpty,
  Matches,
  IsAlpha,
  MinLength,
  Min,
  IsNumber,
} from 'class-validator';

export class CreateCustomerDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak',
  })
  @IsNotEmpty()
  password: string;

  @MinLength(1)
  @IsAlpha()
  @IsNotEmpty()
  firstName: string;

  @MinLength(1)
  @IsAlpha()
  @IsNotEmpty()
  lastName: string;

  @Min(1)
  @IsNumber()
  @IsNotEmpty()
  balance: number;
}
