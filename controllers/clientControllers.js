const clientService = require('../services/clientServices.js');

exports.getAllclients = async (req, res) => {
  try {
    const clients = await clientService.getAllclients();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch clients', error: err.message });
  }
};

exports.getclientById = async (req, res) => {
  try {
    const client = await clientService.getclientById(req.params.id);
    if (!client) return res.status(404).json({ message: 'client not found' });
    res.json(client);

  } catch (err){
    res.status(500).json({ message: 'Server error', error: err.message });
  }
  
};