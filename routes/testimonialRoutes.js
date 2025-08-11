const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authmiddleware');
const testimonialController = require('../controllers/testimonialControllers');
const { authorizeRoles } = require('../middlewares/authenticate');
const upload = require('../middlewares/multer');

router.get('/', auth, testimonialController.getAlltestimonials);
router.get('/:id', auth, testimonialController.getTestimonialById);
router.post('/', upload.none(), auth, testimonialController.createTestimonial);
router.put('/:id', upload.none(), auth, testimonialController.updateTestimonial);
router.delete('/:id', authorizeRoles('admin'), auth, testimonialController.deleteTestimonial);

module.exports = router;

