const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/auth');

router.post('/login', userController.loginUser);
router.post('/user', userController.createUser);

router.get('/users', authenticateToken, userController.getUsers);
router.delete('/user/:id', authenticateToken, userController.deleteUser);
router.put('/user/:id', authenticateToken, userController.updateUser);


module.exports = router;
