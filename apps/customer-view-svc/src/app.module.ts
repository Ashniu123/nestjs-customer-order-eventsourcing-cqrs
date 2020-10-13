import { CustomerEventKafkaHandlers } from '@customer/customer-common/customer-events.kafka-handlers';
import { customerKafkaConfig } from '@customer/customer-common/customer-kafka.config';
import { KafkaModule } from '@kafka/kafka/kafka.module';
import { KafkaService } from '@kafka/kafka/kafka.service';
import { Module, OnModuleInit } from '@nestjs/common';
import { CqrsModule, EventBus } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Customer, CustomerSchema } from './customer.schema';
import { CustomerEventHandlers } from './events-handlers';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.CUSTOMERS_VIEW_SVC_MONGO_URI ||
        'mongodb://localhost:27017/customer-order',
      { useNewUrlParser: true },
    ),
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
    ]),
    CqrsModule,
    KafkaModule.register(customerKafkaConfig, 'customer-orders-customer'),
  ],
  controllers: [AppController],
  providers: [AppService, ...CustomerEventHandlers],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly event$: EventBus,
    private readonly kafkaService: KafkaService,
  ) {}

  async onModuleInit() {
    this.kafkaService.createConsumer({
      groupId: 'nestjs-customer-orders-customer',
    });
    this.kafkaService.setEventHandlers(CustomerEventKafkaHandlers);
    this.kafkaService.bridgeEventsTo(this.event$.subject$);
    this.event$.publisher = this.kafkaService;
    this.event$.register();
  }
}
