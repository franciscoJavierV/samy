import type { Order } from "../Order.js";

export interface OrderMessagePublisher {
  publishOrderCreated(order: Order): Promise<void>;
}
