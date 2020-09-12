import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from './customer.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Customer.name)
    private customerModel: Model<Customer>,
  ) {}

  async getCustomer(id: string): Promise<Customer> {
    const customer = await this.customerModel.findOne({ id });
    delete customer.password;
    delete customer.salt;
    delete customer._id;
    return customer;
  }
}
