# History Service

A microservice for tracking inventory and product changes history.

## Features

- Track all inventory-related actions
- Query history by product
- Filter history by date range
- Detailed change tracking with old and new values

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up your environment variables:
```bash
# Create a .env file with your database connection string
DATABASE_URL="postgresql://user:password@localhost:5432/history_db"
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

### History
- GET /api/history - Get history entries (supports filtering by productId, startDate, endDate)
- POST /api/history - Create a new history entry

## Development

- Build: `npm run build`
- Run tests: `npm test`
- Generate Prisma client: `npx prisma generate`
- Reset database: `npx prisma db reset`
