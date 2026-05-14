import { connect } from "amqplib";
import type { ChannelModel } from "amqplib";
import { ORDER_EVENTS_QUEUE } from "../../../config/queuesConstants.js";
import { RABBITMQ_URL } from "../../../config/env.js";

export async function startOrderEventsConsumer(): Promise<void> {
  let connection: ChannelModel | null = null;

  try {
    connection = await connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    await channel.assertQueue(ORDER_EVENTS_QUEUE, { durable: true });

    channel.consume(ORDER_EVENTS_QUEUE, (msg) => {
      if (!msg) return;
      console.log("[consumer] order event:", msg.content.toString());
      channel.ack(msg);
    });

    console.log("[consumer] listening on", ORDER_EVENTS_QUEUE);
  } catch (error) {
    console.error("[consumer] failed:", error);

    if (connection) {
      await connection.close().catch(() => {});
    }
    process.exit(1);
  }
}
