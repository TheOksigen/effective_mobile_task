const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ProductService {
  async findAll() {
    return prisma.product.findMany();
  }

  async findById(id) {
    return prisma.product.findUnique({
      where: { id }
    });
  }

  async create(data) {
    return prisma.product.create({
      data
    });
  }
}

module.exports = new ProductService();
