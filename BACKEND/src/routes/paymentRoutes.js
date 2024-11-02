const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const authenticateToken = require('../middleware/authenticateToken');

router.get('/payments', authenticateToken, paymentController.getPayments);
router.post('/payment', authenticateToken, paymentController.createPayment);
router.put('/payment/:id', authenticateToken, paymentController.updatePayment);
router.delete('/payment/:id', authenticateToken, paymentController.deletePayment);

module.exports = router;
