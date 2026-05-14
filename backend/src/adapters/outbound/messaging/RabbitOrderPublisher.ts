import type { Channel } from "amqplib";
import { connect } from "amqplib";
import type { Order } from "../../../domain/Order.js";
import type { OrderMessagePublisher } from "../../../domain/ports/OrderMessagePublisher.js";
import { assertOrderEventsQueues } from "../../../config/assertOrderEventsQueues.js";
import { ORDER_EVENTS_QUEUE } from "../../../config/queuesConstants.js";
import { RABBITMQ_URL } from "../../../config/env.js";

let channel: Channel | null = null;

 //get and syncronice the channel with connection
async function getChannel(): Promise<Channel> {
  if (channel) return channel;
  const connection = await connect(RABBITMQ_URL);
  const localChannel = await connection.createChannel();
  await assertOrderEventsQueues(localChannel);
  channel = localChannel;
  return localChannel;
}

export class RabbitOrderPublisher implements OrderMessagePublisher {
  async publishOrderCreated(order: Order): Promise<void> {
    const channel = await getChannel();
    channel.sendToQueue(
      ORDER_EVENTS_QUEUE,
      Buffer.from(JSON.stringify(order)),
      { persistent: true },
    );
  }
}
