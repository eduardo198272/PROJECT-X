const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authenticateToken = require('../middleware/authenticateToken');

router.get('/orders', authenticateToken, orderController.getOrders);
router.post('/order', authenticateToken, orderController.createOrder);
router.put('/order/:id', authenticateToken, orderController.updateOrder);
router.delete('/order/:id', authenticateToken, orderController.deleteOrder);

module.exports = router;
