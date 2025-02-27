const express = require('express');
const router = express.Router();

const checkAuthMiddleware = require('../middleware/check-auth');
const userController = require('../controllers/UserController');

/* Sign Up */
router.post('/signup', userController.signUp);

/* Login */
router.post('/login', userController.login)

/* User Details */
router.get('/:id', checkAuthMiddleware.checkAuth, userController.userDetails)

module.exports = router;
