const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authmiddleware');
const adminController = require('../controllers/adminControllers');
const upload = require('../middlewares/multer');

router.get('/', auth, adminController.getAllAdmins);
router.get('/roles', auth, adminController.getRoles);
router.get('/:id', auth, adminController.getAdmin);
router.get('/roles/:id', auth, adminController.getRoleById);
router.post('/roles', upload.none(), auth, adminController.createRole);
router.put('/roles/:id', upload.none(), auth, adminController.updateRole);
router.put('/make-admin', upload.none(), auth, adminController.makeAdmin);
router.delete('/roles/:id', auth, adminController.deleteRole);

module.exports=router;