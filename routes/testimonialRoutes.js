const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authmiddleware');
const testimonialController = require('../controllers/testimonialControllers');
const { authorizeRoles } = require('../middlewares/authenticate');

router.get('/', auth, testimonialController.getAlltestimonials);
router.get('/:id', auth, testimonialController.getTestimonialById);
router.post('/', auth, testimonialController.createTestimonial);
router.put('/:id', auth, testimonialController.updateTestimonial);
router.delete('/:id', authorizeRoles('admin'), auth, testimonialController.deleteTestimonial);

module.exports = router;

