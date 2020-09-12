import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderDto } from '@order/order-common/create-order.dto';
import { AppService } from './app.service';

@Controller('order')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  getHello(@Body() createOrderDto: CreateOrderDto): Promise<{ id: string }> {
    return this.appService.createOrder(createOrderDto);
  }
}
