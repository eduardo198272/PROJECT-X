const express = require('express');
const router = express.Router();
const orderItemController = require('../controllers/orderItemController');
const authenticateToken = require('../middleware/auth');

router.get('/orderItems', authenticateToken, orderItemController.getOrderItems);
router.post('/orderItem', authenticateToken, orderItemController.createOrderItem);
router.put('/orderItem/:id', authenticateToken, orderItemController.updateOrderItem);
router.delete('/orderItem/:id', authenticateToken, orderItemController.deleteOrderItem);

module.exports = router;
