const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authmiddleware');
const clientController = require('../controllers/clientControllers');

router.get('/', auth, clientController.getAllclients);
router.post('/profile/:id', auth, clientController.profile);
router.get('/:id', auth, clientController.getclientById);
router.put('/:id', auth, clientController.updateClient);
router.delete('/:id', auth, clientController.deleteClient);

module.exports = router;