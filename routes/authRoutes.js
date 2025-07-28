const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/authControllers');
const userControllers = require('../controllers/userControllers');
const formDataParser = require('../middlewares/multer')

router.post('/refresh', authControllers.refreshToken)
router.post('/login', formDataParser, authControllers.login);
router.post('/register', userControllers.createUser);
router.post('/forget-password', authControllers.forget_password);
router.post('/forget-password/:token/:id', authControllers.reset_password);
router.post('/verify-email/:id', authControllers.verify_email);
router.post('/resend-otp', authControllers.resend_otp);
module.exports = router;

