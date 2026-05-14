import express from "express";
import type { CreateOrderPort } from "../../../application/ports/CreateOrderPort.js";

import cors from "cors";
import { createOrdersRouter } from "./ordersRouter.js";

export function createApp(createOrder: CreateOrderPort) {
  const app = express();
  app.use(express.json());
  
  app.use(cors());
  app.use("/orders", createOrdersRouter(createOrder));
  return app;
}
