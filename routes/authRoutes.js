const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/authControllers');
const userControllers = require('../controllers/userControllers');
const upload = require('../middlewares/multer');

router.post('/refresh-token', authControllers.refreshToken)
router.post('/login', upload.none(), authControllers.login);
router.post('/register', upload.none(), userControllers.createUser);
router.post('/forgot-password', upload.none(), authControllers.forgot_password);
router.post('/reset-password/:token/:id', upload.none(), authControllers.reset_password);
router.post('/verify-email/:id', upload.none(), authControllers.verify_email);
router.post('/resend-otp', upload.none(), authControllers.resend_otp);
module.exports = router;

