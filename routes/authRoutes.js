
const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/authControllers');

router.post('/login', authControllers.login);
router.post('/signup', authControllers.signup);
router.post('/refresh', authControllers.refreshToken)
module.exports = router;

