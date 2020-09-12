import { CreateCustomerEvent } from '@customer/customer-common/create-customer.event';
import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose/dist/common/mongoose.decorators';
import { Model } from 'mongoose';
import { Customer } from '../customer.schema';
import * as bcrypt from 'bcrypt';

@EventsHandler(CreateCustomerEvent)
export class CreateCustomerEventHandler
  implements IEventHandler<CreateCustomerEvent> {
  private logger = new Logger('CreateCustomerEventHandler');

  constructor(
    @InjectModel(Customer.name)
    private customerModel: Model<Customer>,
  ) {}

  async handle(event: CreateCustomerEvent) {
    this.logger.log(`Running event handler with: ${JSON.stringify(event)}`);

    const { customerId, createCustomerDto } = event;

    try {
      const salt = await bcrypt.genSalt();
      const customer = await new this.customerModel({
        id: customerId,
        ...createCustomerDto,
        salt,
        password: await bcrypt.hash(createCustomerDto.password, salt),
      }).save();

      this.logger.debug(`Created customer: ${JSON.stringify(customer)}`);
    } catch (error) {
      this.logger.error(`Failed to create customer: ${error.stack}`);
    }
  }
}
