import { KafkaModule } from '@kafka/kafka/kafka.module';
import { KafkaService } from '@kafka/kafka/kafka.service';
import { orderKafkaConfig } from '@order/order-common/order-kafka.config';
import { Module, OnModuleInit } from '@nestjs/common';
import { CommandBus, CqrsModule, EventBus } from '@nestjs/cqrs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderCommandHandlers } from './commands-handlers';
import { OrderAdapter } from './order.adapter';

@Module({
  imports: [
    CqrsModule,
    KafkaModule.register(orderKafkaConfig, 'customer-orders-orders'),
  ],
  controllers: [AppController],
  providers: [AppService, ...OrderCommandHandlers, OrderAdapter],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly command$: CommandBus,
    private readonly event$: EventBus,
    private readonly kafkaService: KafkaService,
  ) {}

  async onModuleInit() {
    this.kafkaService.createProducer();
    this.event$.publisher = this.kafkaService;
    this.command$.register(OrderCommandHandlers);
  }
}
