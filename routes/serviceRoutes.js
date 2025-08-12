const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authmiddleware');
const serviceController = require('../controllers/serviceControllers');
const { authorizeRoles } = require('../middlewares/authenticate');
const upload = require('../middlewares/multer');

router.get('/', auth, serviceController.getAllServices);
router.get('/:id', auth, serviceController.getService);
router.post('/', upload.single('banner'), authorizeRoles('admin'), auth, serviceController.createService);
router.put('/:id', upload.single('banner'), authorizeRoles('admin'), auth, serviceController.updateService);
router.delete('/:id', authorizeRoles('admin'), auth, serviceController.deleteService);

module.exports = router;