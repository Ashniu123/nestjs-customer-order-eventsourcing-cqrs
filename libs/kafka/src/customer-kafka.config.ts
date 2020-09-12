import { KafkaConfig } from 'kafkajs';

export const customerKafkaConfig: KafkaConfig = {
  brokers: process.env.KAFKA_BROKERS?.split(',') || ['localhost:9092'],
  clientId: process.env.KAFKA_CLIENT_ID || 'nestjs-customer-order',
};
