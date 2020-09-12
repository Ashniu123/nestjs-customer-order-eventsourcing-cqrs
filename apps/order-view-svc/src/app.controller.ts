import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Order } from './order.schema';

@Controller('order')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/:id')
  getOrder(@Param('id') id: string): Promise<Order> {
    return this.appService.getOrder(id);
  }
}
