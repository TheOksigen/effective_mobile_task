const { z } = require('zod');

const productSchema = z.object({
  name: z.string().min(1, {
    message: 'Product name is required',
  }),
  sku: z.string().min(1, {
    message: 'SKU is required',
  }),
  price: z.number().positive({
    message: 'Price must be a positive number',
  }),
  description: z.string().optional(),
});

const stockSchema = z.object({
  productId: z.string().uuid({
    message: 'Product ID must be a valid UUID',
  }),
  quantity: z.number().int().min(0, {
    message: 'Quantity must be a non-negative integer',
  }),
  location: z.string().min(1, {
    message: 'Location is required',
  }),
});

const updateStockSchema = z.object({
  quantity: z.number().int().min(0, {
    message: 'Quantity must be a non-negative integer',
  }),
  location: z.string().min(1, {
    message: 'Location is required',
  }),
});

const idParamSchema = z.object({
  id: z.string().uuid({
    message: 'Invalid ID format',
  }),
});

const productIdParamSchema = z.object({
  productId: z.string().uuid({
    message: 'Invalid product ID format',
  }),
});

module.exports = {
  productSchema,
  stockSchema,
  updateStockSchema,
  idParamSchema,
  productIdParamSchema,
};
