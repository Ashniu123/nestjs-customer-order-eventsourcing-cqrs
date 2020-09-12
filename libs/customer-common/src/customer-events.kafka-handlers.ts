import { CreateCustomerDto } from './create-customer.dto';
import { CreateCustomerEvent } from './create-customer.event';
import { DeleteCustomerEvent } from './delete-customer.event';

export const CustomerEventKafkaHandlers = {
  CreateCustomerEvent: (id: string, data: CreateCustomerDto) =>
    new CreateCustomerEvent(id, data),
  DeleteCustomerEvent: (id: string) => new DeleteCustomerEvent(id),
};
