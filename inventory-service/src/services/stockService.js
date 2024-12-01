const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class StockService {
  async findByProduct(productId) {
    return prisma.stock.findMany({
      where: { productId }
    });
  }

  async update(id, data) {
    return prisma.stock.update({
      where: { id },
      data
    });
  }

  async create(data) {
    return prisma.stock.create({
      data
    });
  }
}

module.exports = new StockService();
