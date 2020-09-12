import { CreateCustomerEventHandler } from './create-customer.event-handlers';
import { DeleteCustomerEventHandler } from './delete-customer.event-handler';

export const CustomerEventHandlers = [
  CreateCustomerEventHandler,
  DeleteCustomerEventHandler,
];
