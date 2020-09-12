import { Controller, Get, Param } from '@nestjs/common';
import { Order } from 'apps/order-view-svc/src/order.schema';
import { AppService } from './app.service';
import { Customer } from './customer.schema';

@Controller('customer')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/:id')
  getCustomer(@Param('id') id: string): Promise<Customer> {
    return this.appService.getCustomer(id);
  }

  @Get('/:id/orders')
  getCustomerOrders(@Param('id') id: string): Promise<Order[]> {
    return;
  }
}
