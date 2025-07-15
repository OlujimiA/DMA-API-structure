const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authmiddleware');
const orgController = require('../controllers/orgControllers');
const { authorizeRoles }= require('../middlewares/authenticate')

router.get('/', authorizeRoles('admin'), auth, orgController.getAllorgs);
router.get('/contact', authorizeRoles('admin'), auth, orgController.getAllContacts);
router.get('/contact/:id', auth, orgController.getContact);
router.get('/:id', auth, orgController.getorgById);
router.post('/', auth, orgController.createOrg);
router.post('/contact', auth, orgController.createContact);
router.put('/:id', auth, orgController.updateOrg);
router.delete('/:id', auth, orgController.deleteOrg);

module.exports = router;

