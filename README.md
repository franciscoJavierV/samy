# Samy

Monorepo with **backend** (Node + Express + RabbitMQ) y **frontend** (React + TypeScript + Vite).

## Backend (`backend/`)

API HTTP to public events in RabbitMQ.

**Requirements:** Node 20+, RabbitMQ (p. ej. `npm run rabbitmq` con Docker).

**Variables:** `PORT` (default `3000`), `RABBITMQ_URL` (default `amqp://localhost`).

```bash
cd backend
npm install
npm run rabbitmq    # opcional: levanta RabbitMQ
npm run dev         # API HTTP
npm run dev:consumer # 

## Updates

### Backend

- Refactored the backend structure to better align with **Hexagonal Architecture**: clearer separation between application, domain, and infrastructure layers.
- Added **ports/interfaces** and improved dependency-injection flow, including `CreateOrderPort`, command / use case separation, and repository abstractions.
- **Reorganized and renamed adapters/folders**, making HTTP and RabbitMQ responsibilities easier to follow.
- **Improved RabbitMQ consumer structure and lifecycle handling**: fixed connection/channel handling and removed duplicated implementations.
- **Consolidated RabbitMQ publisher implementation**, leaving a single outbound messaging implementation.
- **Added comments across the codebase**, explaining architectural decisions and responsibilities.
- **Added DLQ (Dead Letter Queue) support**, improving resilience and failure handling for messaging.
- **Fixed TypeScript/CORS typing issues** and aligned imports/paths across the backend.


### Frontend

- **Reorganized the frontend structure** into feature/api-based folders.
- **Added a simple order creation flow**: customer input, loading/error/success states, and basic styling.
- **Improved Docker/frontend integration**, including Vite proxy/nginx configuration and Docker setup.
