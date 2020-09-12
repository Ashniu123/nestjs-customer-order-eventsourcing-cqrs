import { IEvent } from '@nestjs/cqrs';
import { CreateOrderDto } from './create-order.dto';

export class CreateOrderEvent implements IEvent {
  constructor(
    readonly orderId: string,
    readonly createOrderDto: CreateOrderDto,
  ) {}
}
