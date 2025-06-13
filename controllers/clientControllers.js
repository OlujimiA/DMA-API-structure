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
    res.status(500).json({ message: 'Server error', error: err.message });
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