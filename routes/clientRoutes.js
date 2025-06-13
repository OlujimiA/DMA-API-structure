const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientControllers.js');

router.get('/', clientController.getAllclients);
router.get('/:id', clientController.getclientById);

module.exports = router;