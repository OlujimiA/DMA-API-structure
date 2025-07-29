const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/authControllers');
const userControllers = require('../controllers/userControllers');
const formDataParser = require('../middlewares/multer');

router.post('/refresh-token', authControllers.refreshToken)
router.post('/login', formDataParser, authControllers.login);
router.post('/register', formDataParser, userControllers.createUser);
router.post('/forgot-password', formDataParser, authControllers.forgot_password);
router.post('/reset-password/:token/:id', formDataParser, authControllers.reset_password);
router.post('/verify-email/:id', formDataParser, authControllers.verify_email);
router.post('/resend-otp', formDataParser, authControllers.resend_otp);
module.exports = router;

