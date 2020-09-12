import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose/dist/common/mongoose.decorators';
import { CreateOrderEvent } from '@order/order-common/create-order.event';
import { OrderState } from '@order/order-common/order-state.enum';
import { Customer } from 'apps/customer-view-svc/src/customer.schema';
import { Model } from 'mongoose';
import { Order } from '../order.schema';

@EventsHandler(CreateOrderEvent)
export class CreateOrderEventHandler
  implements IEventHandler<CreateOrderEvent> {
  private logger = new Logger('CreateOrderEventHandler');

  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<Order>,

    @InjectModel(Customer.name)
    private customerModel: Model<Customer>,
  ) {}

  async handle(event: CreateOrderEvent) {
    this.logger.log(`Running event handler with: ${JSON.stringify(event)}`);

    const { orderId, createOrderDto } = event;

    try {
      let customer = await this.customerModel.findOne({
        id: createOrderDto.customerId,
      });
      this.logger.debug(`Found customer: ${JSON.stringify(customer)}`);

      let state = OrderState.APPROVED;
      if (customer.balance < createOrderDto.amount) {
        state = OrderState.REJECTED;
      } else {
        customer.balance -= createOrderDto.amount;
        customer = await customer.save();
        this.logger.debug(`customer saved: ${JSON.stringify(customer)}`);
      }

      const order = await new this.orderModel({
        id: orderId,
        ...createOrderDto,
        state,
      }).save();

      this.logger.debug(`Created order: ${JSON.stringify(order)}`);
    } catch (error) {
      this.logger.error(`Failed to create order: ${error.stack}`);
    }
  }
}
