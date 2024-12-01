const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const { id } = req.validatedData;
    const product = await prisma.product.findUnique({
      where: { id }
    });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, sku, price, description } = req.validatedData;
    // console.log(name, sku, price, description);
    const product = await prisma.product.create({
      data: {
        name,
        sku,
        price,
        description
      }
    });
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'SKU must be unique' });
    }
    res.status(500).json({ error: 'Failed to create product' });
  }
};
