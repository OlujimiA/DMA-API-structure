const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController.js');

router.get('/:id', testimonialController.getTestimonialByOrgId);

module.exports = router;