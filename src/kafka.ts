import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'uriti-erp-microsrvices',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'uruti-erp-group' });

const connectKafka = async () => {
  await producer.connect();
  await consumer.connect();
};

export { producer, consumer, connectKafka };
