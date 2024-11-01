const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authenticateToken = require('../middleware/auth');

router.get('/products', authenticateToken, productController.getProducts);
router.post('/product', authenticateToken, productController.createProduct);
router.put('/product/:id', authenticateToken, productController.updateProduct);
router.delete('/product/:id', authenticateToken, productController.deleteProduct);

module.exports = router;
