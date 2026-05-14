import type { Channel } from "amqplib";
import { ORDER_EVENTS_DLQ, ORDER_EVENTS_QUEUE } from "./queuesConstants.js";

export async function assertOrderEventsQueues(channel: Channel): Promise<void> {
  await channel.assertQueue(ORDER_EVENTS_DLQ, { durable: true });
  await channel.assertQueue(ORDER_EVENTS_QUEUE, {
    durable: true,
    arguments: {
      "x-dead-letter-exchange": "",
      "x-dead-letter-routing-key": ORDER_EVENTS_DLQ,
    },
  });
}
