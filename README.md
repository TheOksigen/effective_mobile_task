# Inventory Management System

This system consists of two microservices:
1. Inventory Service (Port 3000)
2. History Service (Port 3001)

## Services Overview

### Inventory Service
Manages products and their stock levels.

### History Service
Tracks all changes made to products and stock levels.

## API Documentation

### Inventory Service (http://localhost:3000)

#### Products API

1. Create Product
```bash
POST /api/products

Request:
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "iPhone 14",
    "sku": "IPHN14-128",
    "price": 999.99,
    "description": "Latest iPhone model with 128GB storage"
  }'

Response:
{
  "id": "uuid",
  "name": "iPhone 14",
  "sku": "IPHN14-128",
  "price": 999.99,
  "description": "Latest iPhone model with 128GB storage",
  "createdAt": "2023-12-01T10:00:00.000Z",
  "updatedAt": "2023-12-01T10:00:00.000Z"
}
```

2. Get All Products
```bash
GET /api/products

Request:
curl http://localhost:3000/api/products

Response:
[
  {
    "id": "uuid",
    "name": "iPhone 14",
    "sku": "IPHN14-128",
    "price": 999.99,
    "description": "Latest iPhone model with 128GB storage",
    "createdAt": "2023-12-01T10:00:00.000Z",
    "updatedAt": "2023-12-01T10:00:00.000Z"
  }
]
```

3. Get Product by ID
```bash
GET /api/products/:id

Request:
curl http://localhost:3000/api/products/uuid

Response:
{
  "id": "uuid",
  "name": "iPhone 14",
  "sku": "IPHN14-128",
  "price": 999.99,
  "description": "Latest iPhone model with 128GB storage",
  "createdAt": "2023-12-01T10:00:00.000Z",
  "updatedAt": "2023-12-01T10:00:00.000Z"
}
```

#### Stock API

1. Create Stock Entry
```bash
POST /api/stock

Request:
curl -X POST http://localhost:3000/api/stock \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "product-uuid",
    "quantity": 100,
    "location": "Warehouse A"
  }'

Response:
{
  "id": "uuid",
  "productId": "product-uuid",
  "quantity": 100,
  "location": "Warehouse A",
  "createdAt": "2023-12-01T10:00:00.000Z",
  "updatedAt": "2023-12-01T10:00:00.000Z",
  "product": {
    "id": "product-uuid",
    "name": "iPhone 14",
    ...
  }
}
```

2. Get Stock by Product ID
```bash
GET /api/stock/product/:productId

Request:
curl http://localhost:3000/api/stock/product/product-uuid

Response:
[
  {
    "id": "uuid",
    "productId": "product-uuid",
    "quantity": 100,
    "location": "Warehouse A",
    "createdAt": "2023-12-01T10:00:00.000Z",
    "updatedAt": "2023-12-01T10:00:00.000Z",
    "product": {
      "id": "product-uuid",
      "name": "iPhone 14",
      ...
    }
  }
]
```

3. Update Stock
```bash
PUT /api/stock/:id

Request:
curl -X PUT http://localhost:3000/api/stock/stock-uuid \
  -H "Content-Type: application/json" \
  -d '{
    "quantity": 90,
    "location": "Warehouse B"
  }'

Response:
{
  "id": "stock-uuid",
  "productId": "product-uuid",
  "quantity": 90,
  "location": "Warehouse B",
  "createdAt": "2023-12-01T10:00:00.000Z",
  "updatedAt": "2023-12-01T10:00:00.000Z",
  "product": {
    "id": "product-uuid",
    "name": "iPhone 14",
    ...
  }
}
```

### History Service (http://localhost:3001)

#### History API

1. Create History Entry
```bash
POST /api/history

Request:
curl -X POST http://localhost:3001/api/history \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "product-uuid",
    "action": "STOCK_UPDATED",
    "quantity": 90,
    "location": "Warehouse B",
    "oldValue": {
      "quantity": 100,
      "location": "Warehouse A"
    },
    "newValue": {
      "quantity": 90,
      "location": "Warehouse B"
    },
    "userId": "user-123"
  }'

Response:
{
  "id": "uuid",
  "productId": "product-uuid",
  "action": "STOCK_UPDATED",
  "quantity": 90,
  "location": "Warehouse B",
  "oldValue": {
    "quantity": 100,
    "location": "Warehouse A"
  },
  "newValue": {
    "quantity": 90,
    "location": "Warehouse B"
  },
  "userId": "user-123",
  "timestamp": "2023-12-01T10:00:00.000Z"
}
```

2. Get History (with optional filters)
```bash
GET /api/history?productId=product-uuid&startDate=2023-12-01&endDate=2023-12-02

Request:
curl "http://localhost:3001/api/history?productId=product-uuid&startDate=2023-12-01&endDate=2023-12-02"

Response:
[
  {
    "id": "uuid",
    "productId": "product-uuid",
    "action": "STOCK_UPDATED",
    "quantity": 90,
    "location": "Warehouse B",
    "oldValue": {
      "quantity": 100,
      "location": "Warehouse A"
    },
    "newValue": {
      "quantity": 90,
      "location": "Warehouse B"
    },
    "userId": "user-123",
    "timestamp": "2023-12-01T10:00:00.000Z"
  }
]
```

## Action Types
The history service supports the following action types:
- `STOCK_CREATED`: When new stock is added
- `STOCK_UPDATED`: When stock quantity or location is updated
- `STOCK_DELETED`: When stock is removed
- `PRODUCT_CREATED`: When a new product is created
- `PRODUCT_UPDATED`: When product details are updated
- `PRODUCT_DELETED`: When a product is deleted

## Error Responses

All endpoints may return the following error responses:

```json
{
  "error": "Error message description"
}
```

Common HTTP status codes:
- 400: Bad Request (invalid input)
- 404: Not Found
- 500: Internal Server Error
