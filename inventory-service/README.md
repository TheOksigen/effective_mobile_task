# Inventory Service

A microservice for managing product inventory and stock levels.

## Features

- Product management (CRUD operations)
- Stock tracking per product
- Location-based inventory management

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up your environment variables:
```bash
# Create a .env file with your database connection string
DATABASE_URL="postgresql://user:password@localhost:5432/inventory_db"
```

3. Run database migrations:
```bash
npx prisma migrate dev
```

4. Start the service:
```bash
npm run dev
```

## API Endpoints

### Products
- GET /api/products - List all products
- GET /api/products/:id - Get a single product
- POST /api/products - Create a new product

### Stock
- GET /api/stock/product/:productId - Get stock levels for a product
- PUT /api/stock/:id - Update stock level
- POST /api/stock - Create new stock entry

## Development

- Run tests: `npm test`
- Generate Prisma client: `npx prisma generate`
- Reset database: `npx prisma db reset`
