import type { Request, Response } from "express";
import { Router } from "express";
import type { CreateOrderPort } from "../../../application/ports/CreateOrderPort.js";

export function createOrdersRouter(createOrder: CreateOrderPort): Router {
  const router = Router();

  router.post("/", async (req: Request, res: Response) => {
    const customerId = typeof req.body?.customerId === "string" ? req.body.customerId : "";
    console.log("REQ", req.body);
    if (!customerId) {
      res.status(400).json({ error: "customerId is required" });
      return;
    }
    const order = await createOrder.execute({ customerId });
    res.status(201).json(order);
  });

  return router;
}
