import { createApp } from "./adapters/inbound/httpRequest/expressApp.js";
import { CreateOrderUseCase } from "./application/CreateOrders.js";
import { RabbitOrderPublisher } from "./adapters/outbound/messaging/RabbitOrderPublisher.js";
import { HTTP_PORT } from "./config/env.js";

const createOrder = new CreateOrderUseCase(new RabbitOrderPublisher());
const app = createApp(createOrder);

app.listen(HTTP_PORT, () => {
  console.log(`[http] listening on :${HTTP_PORT}`);
});
