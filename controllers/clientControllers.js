const bcrypt = require('bcrypt');
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
    res.status(500).json({message: 'Server error', error: err.message });
  }
  
};

exports.createClient = async (req, res) => {
  try {
    const { name, email, tel, country, password } = req.body;

    if (!name || !email || !tel || !country || !password) {
      return res.status(400).json({ message: 'All fields are required - name, email, tel, country, and password' });
    }

    const hashed_password = await bcrypt.hash(password, 10);

    const newClient = await clientService.createClient({
      name,
      email,
      tel,
      country,
      password: hashed_password,
    });

    res.status(201).json({ message: 'Client created successfully', Client: newClient });
  } catch (err) {
    res.status(500).json({ message: 'Could not create Client', error: err.message });
  }
};

exports.updateClient = async (req, res) => {
  try {
    const { name, email, tel, country, password } = req.body;
    const { id } = req.params;

    if (!name || !email || !tel || !country || !password) {
      return res.status(400).json({ message: 'All fields are required - name, email, tel, country, password' });
    }

    const hashed_password = await bcrypt.hash(password, 10);

    const updated = await clientService.updateClient(id, { name, email, tel, country, password: hashed_password });

    if (!updated) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.json({ message: 'Client updated successfully', client: updated });
  } catch (err) {
    res.status(500).json({ message: 'Could not update client', error: err.message });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await clientService.deleteClient(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.json({ message: 'client deleted successfully', client: deleted });
  } catch (err) {
    res.status(500).json({ message: 'Could not delete client', error: err.message });
  }
};