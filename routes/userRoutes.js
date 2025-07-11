const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authmiddleware');
const userController = require('../controllers/userControllers');
const authenticate = require('../middlewares/authenticate');

router.get('/', auth, userController.getAllusers);
router.post('/profile/:id', auth, userController.profile);
router.get('/:id', auth, userController.getuserById);
router.put('/:id', auth, userController.updateUser);
router.delete('/:id', authenticate.authorizeRoles('admin'), auth, userController.deleteUser);

module.exports = router;