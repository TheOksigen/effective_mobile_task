const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getStockByProduct = async (req, res) => {
  try {
    const { productId } = req.validatedData;
    const stock = await prisma.stock.findMany({
      where: { productId },
      include: {
        product: true
      }
    });
    res.json(stock);
  } catch (error) {
    console.error('Error fetching stock:', error);
    res.status(500).json({ error: 'Failed to fetch stock' });
  }
};

exports.updateStock = async (req, res) => {
  try {
    const { id, quantity, location } = req.validatedData;
    
    const stock = await prisma.stock.update({
      where: { id },
      data: {
        quantity,
        location
      },
      include: {
        product: true
      }
    });
    res.json(stock);
  } catch (error) {
    console.error('Error updating stock:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Stock entry not found' });
    }
    res.status(500).json({ error: 'Failed to update stock' });
  }
};

exports.createStock = async (req, res) => {
  try {
    const { productId, quantity, location } = req.validatedData;
    
    const stock = await prisma.stock.create({
      data: {
        productId,
        quantity,
        location
      },
      include: {
        product: true
      }
    });
    res.status(201).json(stock);
  } catch (error) {
    console.error('Error creating stock:', error);
    if (error.code === 'P2003') {
      return res.status(400).json({ error: 'Invalid product ID' });
    }
    res.status(500).json({ error: 'Failed to create stock' });
  }
};
