const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authmiddleware');
const testimonialController = require('../controllers/testimonialControllers');

router.get('/', auth, testimonialController.getAlltestimonials);
router.get('/:id', auth, testimonialController.getTestimonialByOrgId);
router.post('/', auth, testimonialController.createTestimonial);
router.put('/:id', auth, testimonialController.updateTestimonial);
router.delete('/:id', auth, testimonialController.deleteTestimonial);

module.exports = router;

