const express = require('express');
const router = express.Router();
const orgController = require('../controllers/orgControllers.js');

router.get('/', orgController.getAllorgs);
router.get('/:id', orgController.getorgById);
router.post('/', orgController.createOrg);
router.delete('/:id', orgController.deleteOrg);

module.exports = router;

