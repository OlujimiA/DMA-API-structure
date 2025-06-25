const bcrypt = require('bcrypt');
const clientService = require('../services/clientServices.js');
const generateToken = require('../utils/generateToken')

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
    const { name, email, tel, country, address, category, password } = req.body;

    if (!name || !email || !tel || !country || !address || !category || !password) {
      return res.status(400).json({ message: 'All fields are required - name, email, tel, country, address, category, password' });
    }

    const hashed_password = await bcrypt.hash(password, 10);

    const newClient = await clientService.createClient({
      name,
      email,
      tel,
      country,
      address,
      category,
      password: hashed_password,
    });

    res.status(201).json({ message: 'Client created successfully', Client: newClient });
  } catch (err) {
    res.status(500).json({ message: 'Could not create Client', error: err.message });
  }
};

exports.updateClient = async (req, res) => {
  try {
    const { name, email, tel, country, address, category, password } = req.body;
    const { id } = req.params;

    if (!name || !email || !tel || !country || !address || !category || !password) {
      return res.status(400).json({ message: 'All fields are required - name, email, tel, country, address, category, password' });
    }

    const hashed_password = await bcrypt.hash(password, 10);

    const updated = await clientService.updateClient(id, { name, email, tel, country, address, category, password: hashed_password });

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

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    const result = await clientService.login(email, password);

    if (!result) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const { accessToken, refreshToken } = result.tokens

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false, // set to true in production
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({ AccessToken: accessToken, user: result.user });

  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

exports.forget_password = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) { return res.status(400).json({ message: 'Email is required' }); };

    const client = await clientService.getclientByEmail(email);
    if (!client) return res.status(404).json({ message: 'client not found' });
  
    const { token, hashedToken, expiresAt } = generateToken();
    const id = client.id;
    console.log(token, expiresAt, id);
    await clientService.saveToken({ hashedToken, expiresAt, id });

    res.status(201).json({ message: 'Add the token to your URL', token: token });
  
  } catch (err) {
    res.status(500).json({message: 'Server error', error: err.message });
  }
};

exports.reset_password = async (req, res) => {

};