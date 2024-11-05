const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authenticateToken = require('../middleware/authenticateToken');

router.get('/categories', authenticateToken, categoryController.getCategories);
router.get('/category/dependencies/:id', authenticateToken, categoryController.getCategoryDependencies);
router.get('/category/:id', authenticateToken, categoryController.getCategoryById);
router.post('/category', authenticateToken, categoryController.createCategory);
router.put('/category/:id', authenticateToken, categoryController.updateCategory);
router.delete('/category/:id', authenticateToken, categoryController.deleteCategory);

module.exports = router;
