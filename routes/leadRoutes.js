const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');

router.get('/:organisation_id', leadController.getLeadsByOrganisation);

router.post('/', leadController.createLead);

module.exports = router;
