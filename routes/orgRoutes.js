const express = require('express');
const router = express.Router();
const orgController = require('../controllers/orgControllers.js');

router.get('/', orgController.getAllorgs);
router.get('/:id', orgController.getorgById);
router.post('/', clientController.createOrg);

module.exports = router;