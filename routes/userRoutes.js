const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authmiddleware');
const userController = require('../controllers/userControllers');
const { authorizeRoles } = require('../middlewares/authenticate');

router.get('/', authorizeRoles('admin'), auth, userController.getAllusers);
router.post('/profile/:id', auth, userController.profile);
router.get('/:id', auth, userController.getuserById);
router.put('/:id', auth, userController.updateUser);
router.delete('/:id', authorizeRoles('admin'), auth, userController.deleteUser);

module.exports = router;