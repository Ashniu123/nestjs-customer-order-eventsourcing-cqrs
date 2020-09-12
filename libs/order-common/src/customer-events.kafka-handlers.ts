import { CreateOrderDto } from './create-order.dto';
import { CreateOrderEvent } from './create-order.event';

export const OrderEventKafkaHandlers = {
  CreateOrderEvent: (id: string, data: CreateOrderDto) =>
    new CreateOrderEvent(id, data),
};
