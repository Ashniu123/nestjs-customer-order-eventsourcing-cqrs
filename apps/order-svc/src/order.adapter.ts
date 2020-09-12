import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from '@order/order-common/create-order.dto';
import { OrderAggregate } from './order.aggregate';

@Injectable()
export class OrderAdapter {
  async createOrder(orderId: string, createOrderDto: CreateOrderDto) {
    const order = new OrderAggregate(orderId);
    order.createOrder(createOrderDto);
    return order;
  }
}
