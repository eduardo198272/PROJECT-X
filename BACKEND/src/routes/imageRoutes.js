const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');
const authenticateToken = require('../middleware/authenticateToken'); 

router.get('/uploads', authenticateToken, imageController.listImages);

module.exports = router;
