import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { IEvent, IEventPublisher, IMessageSource } from '@nestjs/cqrs';
import {
  Consumer,
  ConsumerConfig,
  Kafka,
  KafkaConfig,
  Producer,
  ProducerConfig,
} from 'kafkajs';
import { Subject } from 'rxjs';

@Injectable()
export class KafkaService
  implements OnModuleDestroy, IEventPublisher, IMessageSource {
  private logger = new Logger('KafkaService');
  private kafka: Kafka;
  private producer: Producer;
  private consumer: Consumer;
  private topic: string;
  private eventHandlers = {};

  constructor(kafkaConfig: KafkaConfig, topic: string) {
    this.kafka = new Kafka({
      clientId: kafkaConfig.clientId,
      brokers: kafkaConfig.brokers,
    });
    this.topic = topic;
  }

  async onModuleDestroy() {
    await this.disconnect();
    this.logger.log('Kafka connection destroyed');
  }

  async createProducer(producerConfig?: ProducerConfig) {
    this.producer = this.kafka.producer(producerConfig);
    await this.producer.connect();
    this.logger.verbose('Producer connected');
  }

  async createConsumer(consumerConfig?: ConsumerConfig) {
    this.consumer = this.kafka.consumer({
      groupId: consumerConfig?.groupId || 'nestjs-customer-order',
      ...consumerConfig,
    });
    await this.consumer.connect();
    this.logger.verbose('Consumer connected');
  }

  async disconnect() {
    await this.producer?.disconnect();
    await this.consumer?.disconnect();
  }

  async publish<T extends IEvent>(event: T) {
    const message = JSON.stringify({
      ...event,
      eventType: event.constructor.name,
    });
    this.logger.verbose(`Published event: ${message}`);

    try {
      await this.producer.send({
        messages: [{ value: message }],
        topic: this.topic,
      });
    } catch (error) {
      this.logger.error(`Publishing event error: ${error.stack}`);
    }
  }

  async bridgeEventsTo<T extends IEvent>(subject: Subject<T>) {
    this.logger.verbose(`Bridged event subject: ${JSON.stringify(subject)}`);
    try {
      await this.consumer.subscribe({
        topic: this.topic,
        fromBeginning: false,
      });
      this.logger.log(`Subscribed to "${this.topic}"`);
      await this.consumer.run({
        eachMessage: async payload => {
          const { message } = payload;
          this.logger.verbose(
            `Bridged event payload: ${JSON.stringify(payload)}`,
          );
          const { value } = message;
          const parsed = JSON.parse(value.toString('utf8'));
          this.logger.verbose(
            `Bridged event payload value: ${JSON.stringify(parsed)}`,
          );
          const { eventType, ...params } = parsed;
          const event = this.eventHandlers[eventType](...Object.values(params));
          subject.next(event);
        },
      });
    } catch (error) {
      this.logger.error(`Bridged event error: ${error.stack}`);
      subject.error(error);
    }
  }

  setEventHandlers(eventHandlers) {
    this.eventHandlers = eventHandlers;
  }
}
