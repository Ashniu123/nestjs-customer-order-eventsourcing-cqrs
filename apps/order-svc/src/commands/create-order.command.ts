import { CreateOrderDto } from '@order/order-common/create-order.dto';

export class CreateOrderCommand {
  constructor(
    readonly orderId: string,
    readonly createOrderDto: CreateOrderDto,
  ) {}
}
