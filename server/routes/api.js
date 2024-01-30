const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// API routes related to users
router.get('/users', UserController.getAllUsers);
router.post('/addUser', UserController.createUser);
router.delete('/users/:userId', UserController.deleteUser);
router.put('/users/:userId', UserController.updateUser);

module.exports = router;
