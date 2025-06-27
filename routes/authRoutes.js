const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/authControllers');
const clientController = require('../controllers/clientControllers');

router.post('/refresh', authControllers.refreshToken)
router.post('/login', clientController.login);
router.post('/register', clientController.createClient);
router.post('/forget-password', clientController.forget_password);
router.post('/forget-password/:token/:id', clientController.reset_password);
router.post('/verify-email/:id', clientController.verify_email);
router.post('/resend-otp', clientController.resend_otp);
module.exports = router;

