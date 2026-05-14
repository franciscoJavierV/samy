/** Main queue for order-created events (with DLQ routing on reject / expiry). */
export const ORDER_EVENTS_QUEUE = "orders.created";

/** Dead-letter queue: poison messages land here when nacked with requeue=false. */
export const ORDER_EVENTS_DLQ = "orders.created.dlq";
