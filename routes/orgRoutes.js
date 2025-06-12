const express = require('express');
const router = express.Router();
const orgController = require('../controllers/orgController');

router.get('/', orgController.getAllOrganisations);

router.post('/', orgController.createOrganisation);

router.put('/:id', orgController.updateOrganisation);

router.delete('/:id', orgController.deleteOrganisation);

module.exports = router;
