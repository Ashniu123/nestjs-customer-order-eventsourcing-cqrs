import { DeleteCustomerEvent } from '@customer/customer-common/delete-customer.event';
import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose/dist/common/mongoose.decorators';
import { Model } from 'mongoose';
import { Customer } from '../customer.schema';

@EventsHandler(DeleteCustomerEvent)
export class DeleteCustomerEventHandler
  implements IEventHandler<DeleteCustomerEvent> {
  private logger = new Logger('DeleteCustomerEventHandler');

  constructor(
    @InjectModel(Customer.name)
    private customerModel: Model<Customer>,
  ) {}

  async handle(event: DeleteCustomerEvent) {
    this.logger.log(`Running event handler with: ${JSON.stringify(event)}`);

    const { customerId } = event;

    try {
      const result = await this.customerModel.deleteOne({ id: customerId });

      this.logger.debug(`Deleted customer: ${JSON.stringify(result)}`);
    } catch (error) {
      this.logger.error(`Failed to delete customer: ${error.stack}`);
    }
  }
}
