import { AggregateRoot } from '@nestjs/cqrs';
import { CreateOrderDto } from '@order/order-common/create-order.dto';
import { CreateOrderEvent } from '@order/order-common/create-order.event';

export class OrderAggregate extends AggregateRoot {
  constructor(private readonly id?: string) {
    super();
  }

  createOrder(createOrderDto: CreateOrderDto) {
    this.apply(new CreateOrderEvent(this.id, createOrderDto));
  }
}
