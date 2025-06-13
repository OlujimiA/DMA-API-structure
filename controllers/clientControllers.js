const clientService = require('../services/clientServices');

exports.getAllClients = async (req, res) => {
  const clients = await clientService.getAllclients();
  res.json(clients);
};

exports.getclientById = async (req, res) => {
  const client = await clientService.getclientById(req.params.id);
  if (!client) return res.status(404).json({ message: 'client not found' });
  res.json(client);
};
