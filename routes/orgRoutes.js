const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authmiddleware');
const orgController = require('../controllers/orgControllers.js');

router.get('/', auth, orgController.getAllorgs);
router.get('/:id', auth, orgController.getorgById);
router.post('/', auth, orgController.createOrg);
router.delete('/:id', auth, orgController.deleteOrg);

module.exports = router;

