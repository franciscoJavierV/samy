import { CreateOrderForm } from "./features/orders/CreateOrderForm";
import "./App.css";

export default function App() {
  return (
    <main className="app">
      <h1>Samy</h1>
      <p className="lead">Create an order (customer ID)</p>
      <CreateOrderForm />
    </main>
  );
}
