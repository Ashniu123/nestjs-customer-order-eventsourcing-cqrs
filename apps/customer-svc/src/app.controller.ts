import { Controller, Post, Body, Delete, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateCustomerDto } from '@customer/customer-common/create-customer.dto';

@Controller('customer')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  createCustomer(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<{ id: string }> {
    return this.appService.createCustomer(createCustomerDto);
  }

  @Delete('/:id')
  deleteCustomer(@Param('id') id: string): Promise<void> {
    return this.appService.deleteCustomer(id);
  }
}
