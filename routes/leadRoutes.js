const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authmiddleware');
const leadController = require('../controllers/leadControllers.js');

router.get('/', auth, leadController.getAllLeads);
router.get('/:id', auth, leadController.getLeadByOrgId);
router.post('/', auth, leadController.createLead);
router.put('/:id', auth, leadController.updateLead);
router.delete('/:id', auth, leadController.deleteLead);

module.exports = router;