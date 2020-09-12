import { CreateCustomerCommandHandler } from './create-customer.command-handler';
import { DeleteCustomerCommandHandler } from './delete-customer.command-handler';

export const CustomerCommandHandlers = [
  CreateCustomerCommandHandler,
  DeleteCustomerCommandHandler,
];
