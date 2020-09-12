import { Injectable } from '@nestjs/common';
import { CustomerAggregate } from './customer.aggregate';
import { CreateCustomerDto } from '@customer/customer-common/create-customer.dto';

@Injectable()
export class CustomerAdapter {
  async createCustomer(
    customerId: string,
    createCustomerDto: CreateCustomerDto,
  ) {
    const customer = new CustomerAggregate(customerId);
    customer.createCustomer(createCustomerDto);
    return customer;
  }

  async deleteCustomer(customerId: string) {
    const customer = new CustomerAggregate(customerId);
    customer.deleteCustomer();
    return customer;
  }
}
