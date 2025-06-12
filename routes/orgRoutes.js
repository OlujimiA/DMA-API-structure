const express = require('express');
const router = express.Router();
const orgController = require('../controllers/orgController.js');

router.get('/', orgController.getAllOrgs);

router.get('/:id', orgController.getOrgById);

module.exports = router;