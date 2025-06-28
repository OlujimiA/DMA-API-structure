const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authmiddleware');
const serviceController = require('../controllers/serviceControllers');

router.get('/', auth, serviceController.getAllServices);
router.get('/:id', auth, serviceController.getServiceById);
router.post('/', auth, serviceController.createService);
router.put('/:id', auth, serviceController.updateService);
router.delete('/:id', auth, serviceController.deleteService);

module.exports = router;