const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/authControllers');

router.post('/refresh', authControllers.refreshToken)
module.exports = router;

