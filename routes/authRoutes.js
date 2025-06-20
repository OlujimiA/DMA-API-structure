const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/authControllers');
const clientController = require('../controllers/clientControllers.js');

router.post('/refresh', authControllers.refreshToken)
router.post('/login', clientController.login);
router.post('/register', clientController.createClient);
module.exports = router;

