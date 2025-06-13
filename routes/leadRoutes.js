const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadControllers.js');

router.get('/', leadController.getAllLeads);
router.get('/:id', leadController.getLeadByOrgId);
router.post('/', leadController.createLead);
router.put('/:id', leadController.updateLead);
router.delete('/:id', leadController.deleteLead);

module.exports = router;