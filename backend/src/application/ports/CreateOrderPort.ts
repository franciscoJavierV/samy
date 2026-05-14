import type { Order } from "../../domain/Order.js";
import type { CreateOrderCommand } from "../commands/CreateOrderCommand.js";

//just making the post export to be able to switch to another implementation later
export interface CreateOrderPort {
  execute(command: CreateOrderCommand): Promise<Order>;
}
