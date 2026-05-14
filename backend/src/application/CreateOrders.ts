import { randomUUID } from "node:crypto";
import type { Order } from "../domain/Order.js";
import type { OrderMessagePublisher } from "../domain/ports/OrderMessagePublisher.js";
import type { CreateOrderCommand } from "./commands/CreateOrderCommand.js";
import type { CreateOrderPort } from "./ports/CreateOrderPort.js";

export class CreateOrderUseCase implements CreateOrderPort {
  constructor(private readonly publisher: OrderMessagePublisher) {}

  async execute(command: CreateOrderCommand): Promise<Order> {
    const order: Order = {
      id: randomUUID(),
      customerId: command.customerId,
      createdAt: new Date(),
    };
    await this.publisher.publishOrderCreated(order);
    return order;
  }
}
