import { connect } from "amqplib";
import type { ChannelModel } from "amqplib";
import { assertOrderEventsQueues } from "../../../config/assertOrderEventsQueues.js";
import { ORDER_EVENTS_DLQ, ORDER_EVENTS_QUEUE } from "../../../config/queuesConstants.js";
import { RABBITMQ_URL } from "../../../config/env.js";

export async function startOrderEventsConsumer(): Promise<void> {
  let connection: ChannelModel | null = null;

  try {
    connection = await connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    await assertOrderEventsQueues(channel);

    channel.consume(ORDER_EVENTS_QUEUE, (msg) => {
      if (!msg) return;
      const raw = msg.content.toString();
      try {
        JSON.parse(raw);
      } catch {
        console.error("[consumer] invalid JSON → DLQ:", raw);
        channel.nack(msg, false, false);
        return;
      }
      console.log("[consumer] order event:", raw);
      channel.ack(msg);
    });

    console.log("[consumer] listening on", ORDER_EVENTS_QUEUE, "(DLQ:", ORDER_EVENTS_DLQ + ")");
  } catch (error) {
    console.error("[consumer] failed:", error);

    if (connection) {
      await connection.close().catch(() => {});
    }
    process.exit(1);
  }
}
