/*
  Warnings:

  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `plu` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `shopId` on the `Product` table. All the data in the column will be lost.
  - The primary key for the `Stock` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `orderQuantity` on the `Stock` table. All the data in the column will be lost.
  - You are about to drop the column `shelfQuantity` on the `Stock` table. All the data in the column will be lost.
  - You are about to drop the `Shop` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[sku]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `price` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sku` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Stock` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_shopId_fkey";

-- DropForeignKey
ALTER TABLE "Stock" DROP CONSTRAINT "Stock_productId_fkey";

-- DropIndex
DROP INDEX "Product_plu_key";

-- AlterTable
ALTER TABLE "Product" DROP CONSTRAINT "Product_pkey",
DROP COLUMN "plu",
DROP COLUMN "shopId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "sku" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Product_id_seq";

-- AlterTable
ALTER TABLE "Stock" DROP CONSTRAINT "Stock_pkey",
DROP COLUMN "orderQuantity",
DROP COLUMN "shelfQuantity",
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "productId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Stock_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Stock_id_seq";

-- DropTable
DROP TABLE "Shop";

-- CreateIndex
CREATE UNIQUE INDEX "Product_sku_key" ON "Product"("sku");

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
