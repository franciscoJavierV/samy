import { useState, type FormEvent } from "react";
import { postCreateOrder, type Order } from "../../api/createOrder";
import "./CreateOrderForm.css";

export function CreateOrderForm() {
  const [customerId, setCustomerId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [created, setCreated] = useState<Order | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = customerId.trim();
    if (!trimmed) {
      setError("Customer ID is required.");
      setCreated(null);
      return;
    }
    setLoading(true);
    setError(null);
    setCreated(null);
    try {
      const order = await postCreateOrder(trimmed);
      setCreated(order);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="create-order-form" onSubmit={handleSubmit} noValidate>
      <label htmlFor="customerId">
        Customer ID
        <input
          id="customerId"
          name="customerId"
          type="text"
          autoComplete="off"
          placeholder="e.g. cust-001"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          disabled={loading}
        />
      </label>
      <button type="submit" disabled={loading}>
        {loading ? "Creating…" : "Create order"}
      </button>
      {error ? (
        <p className="message message--error" role="alert">
          {error}
        </p>
      ) : null}
      {created ? (
        <p className="message message--ok">
          Order <strong>{created.id}</strong> created for{" "}
          <strong>{created.customerId}</strong>.
        </p>
      ) : null}
    </form>
  );
}
