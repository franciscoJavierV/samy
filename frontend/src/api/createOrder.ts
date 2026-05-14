export type Order = {
  id: string;
  customerId: string;
  createdAt: string;
};

export async function postCreateOrder(customerId: string): Promise<Order> {
  const res = await fetch("/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ customerId }),
  });
  const data: unknown = await res.json();
  if (!res.ok) {
    const msg =
      typeof data === "object" &&
      data !== null &&
      "error" in data &&
      typeof (data as { error: unknown }).error === "string"
        ? (data as { error: string }).error
        : `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return data as Order;
}
