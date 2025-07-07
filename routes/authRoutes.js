const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/authControllers');
const userController = require('../controllers/userControllers');

router.post('/refresh', authControllers.refreshToken)
router.post('/login', userController.login);
router.post('/register', userController.createUser);
router.post('/forget-password', userController.forget_password);
router.post('/forget-password/:token/:id', userController.reset_password);
router.post('/verify-email/:id', userController.verify_email);
router.post('/resend-otp', userController.resend_otp);
module.exports = router;

