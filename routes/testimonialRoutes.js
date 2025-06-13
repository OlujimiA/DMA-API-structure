const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialControllers.js');

router.get('/', testimonialController.getAlltestimonials);
router.get('/:id', testimonialController.getTestimonialByOrgId);
router.post('/', testimonialController.createTestimonial);
router.put('/:id', testimonialController.updateTestimonial);
router.delete('/:id', testimonialController.deleteTestimonial);

module.exports = router;

