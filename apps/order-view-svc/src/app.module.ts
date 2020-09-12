import { KafkaModule } from '@kafka/kafka/kafka.module';
import { KafkaService } from '@kafka/kafka/kafka.service';
import { orderKafkaConfig } from '@kafka/kafka/order-kafka.config';
import { Module, OnModuleInit } from '@nestjs/common';
import { CqrsModule, EventBus } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { OrderEventKafkaHandlers } from '@order/order-common/customer-events.kafka-handlers';
import {
  Customer,
  CustomerSchema,
} from 'apps/customer-view-svc/src/customer.schema';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderEventHandlers } from './event-handlers';
import { Order, OrderSchema } from './order.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.ORDERS_VIEW_SVC_MONGO_URI ||
        'mongodb://localhost:27017/customer-order',
      { useNewUrlParser: true },
    ),
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
    ]),
    CqrsModule,
    KafkaModule.register(orderKafkaConfig, 'customer-orders-orders'),
  ],
  controllers: [AppController],
  providers: [AppService, ...OrderEventHandlers],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly event$: EventBus,
    private readonly kafkaService: KafkaService,
  ) {}

  async onModuleInit() {
    this.kafkaService.createConsumer({
      groupId: 'nestjs-customer-orders-orders',
    });
    this.kafkaService.setEventHandlers(OrderEventKafkaHandlers);
    await this.kafkaService.bridgeEventsTo(this.event$.subject$);
    this.event$.publisher = this.kafkaService;
    this.event$.register(OrderEventHandlers);
  }
}
