const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authmiddleware');
const orgController = require('../controllers/orgControllers');
const { authorizeRoles }= require('../middlewares/authenticate');
const upload = require('../middlewares/multer');

router.get('/', authorizeRoles('admin'), auth, orgController.getAllorgs);
router.get('/:id', auth, orgController.getorgById);
router.post('/', upload.single('logo'), auth, orgController.createOrg);
router.put('/:id', upload.single('logo'), auth, orgController.updateOrg);
router.delete('/:id', auth, orgController.deleteOrg);
router.get('/contact', authorizeRoles('admin'), auth, orgController.getAllContacts);
router.get('/contact/:id', auth, orgController.getContact);
router.post('/contact', upload.fields([ { name: 'profile-pic', maxCount: 1 }, { name: 'IDs', maxCount: 5 } ]), auth, orgController.createContact);


module.exports = router;

