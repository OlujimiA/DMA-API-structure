const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController.js');

router.get('/:id', serviceController.getServiceByOrgId);

module.exports = router;