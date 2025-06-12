const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');

router.get('/:organisation_id', testimonialController.getTestimonialsByOrganisation);

router.post('/', testimonialController.createTestimonial);

router.put('/:id', testimonialController.updateTestimonial);

router.delete('/:id', testimonialController.deleteTestimonial);

module.exports = router;
