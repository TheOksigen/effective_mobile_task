-- CreateEnum
CREATE TYPE "ActionType" AS ENUM ('STOCK_CREATED', 'STOCK_UPDATED', 'STOCK_DELETED', 'PRODUCT_CREATED', 'PRODUCT_UPDATED', 'PRODUCT_DELETED');

-- CreateTable
CREATE TABLE "InventoryHistory" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "action" "ActionType" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "oldValue" JSONB,
    "newValue" JSONB,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,

    CONSTRAINT "InventoryHistory_pkey" PRIMARY KEY ("id")
);
