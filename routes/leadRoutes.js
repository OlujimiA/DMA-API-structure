const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController.js');

router.get('/:id', leadController.getLeadByOrgId);

module.exports = router;