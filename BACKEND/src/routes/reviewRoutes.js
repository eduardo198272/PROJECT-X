const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authenticateToken = require('../middleware/auth');

router.get('/reviews', authenticateToken, reviewController.getReviews);
router.post('/review', authenticateToken, reviewController.createReview);
router.put('/review/:id', authenticateToken, reviewController.updateReview);
router.delete('/review/:id', authenticateToken, reviewController.deleteReview);

module.exports = router;
