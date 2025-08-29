const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authmiddleware');
const serviceController = require('../controllers/serviceControllers');
const { authorizeRoles } = require('../middlewares/authenticate');
const upload = require('../middlewares/multer');

router.get('/', auth, serviceController.getAllServices);
router.get('/:id', auth, serviceController.getService);
router.post('/', auth, authorizeRoles('admin'), upload.single('banner'), serviceController.createService);
router.put('/:id', auth, authorizeRoles('admin'), upload.single('banner'), serviceController.updateService);
router.delete('/:id', auth, authorizeRoles('admin'), serviceController.deleteService);

module.exports = router;