import { startOrderEventsConsumer } from "./adapters/inbound/rabbitmqConsumer/startOrderEventsConsumer.js";

void startOrderEventsConsumer().catch((err) => {
  console.error("[consumer] failed:", err);
  process.exit(1);
});
