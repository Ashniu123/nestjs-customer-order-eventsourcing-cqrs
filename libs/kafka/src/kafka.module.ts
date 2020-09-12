import { DynamicModule, Module } from '@nestjs/common';
import { KafkaConfig } from 'kafkajs';
import { KafkaService } from './kafka.service';

@Module({})
export class KafkaModule {
  static register(kafkaConfig: KafkaConfig, topic: string): DynamicModule {
    return {
      global: true,
      module: KafkaModule,
      providers: [
        {
          provide: KafkaService,
          useValue: new KafkaService(kafkaConfig, topic),
        },
      ],
      exports: [KafkaService],
    };
  }
}
