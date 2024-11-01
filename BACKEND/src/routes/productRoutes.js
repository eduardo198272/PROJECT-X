const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authenticateToken = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/products', authenticateToken, productController.getProducts);
router.post('/product', authenticateToken, upload.single('image'), productController.createProduct);
router.put('/product/:id', authenticateToken, upload.single('image'), productController.updateProduct);
router.delete('/product/:id', authenticateToken, productController.deleteProduct);

module.exports = router;
