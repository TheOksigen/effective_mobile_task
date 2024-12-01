const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');
const validateRequest = require('../middleware/validateRequest');
const { 
  stockSchema, 
  updateStockSchema, 
  productIdParamSchema, 
  idParamSchema 
} = require('../validations/schemas');

router.get('/product/:productId', 
  validateRequest(productIdParamSchema), 
  stockController.getStockByProduct
);

router.put('/:id', 
  validateRequest(idParamSchema.merge(updateStockSchema)), 
  stockController.updateStock
);

router.post('/', 
  validateRequest(stockSchema), 
  stockController.createStock
);

module.exports = router;
