import { IsNotEmpty, IsUUID, Min } from 'class-validator';

export class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty()
  customerId: string;

  @Min(0.01)
  @IsNotEmpty()
  amount: number;
}
