const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authmiddleware');
const clientController = require('../controllers/clientControllers.js');

router.get('/', auth, clientController.getAllclients);
router.get('/:id', auth, clientController.getclientById);
router.post('/', auth, clientController.createClient);
router.put('/:id', auth, clientController.updateClient);
router.delete('/:id', auth, clientController.deleteClient);

module.exports = router;