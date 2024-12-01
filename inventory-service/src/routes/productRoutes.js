const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const validateRequest = require('../middleware/validateRequest');
const { productSchema, idParamSchema } = require('../validations/schemas');

router.get('/', productController.getAllProducts);
router.get('/:id', validateRequest(idParamSchema), productController.getProduct);
router.post('/', validateRequest(productSchema), productController.createProduct);

module.exports = router;
