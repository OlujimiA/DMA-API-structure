const bcrypt = require('bcrypt');
const orgService = require('../services/orgServices.js');

exports.getAllorgs = async (req, res) => {
  try {
    const orgs = await orgService.getAllorgs();
    res.json(orgs);
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch organisations', error: err.message });
  }
};

exports.getorgById = async (req, res) => {
  try {
    const org = await orgService.getorgById(req.params.id);
    if (!org) return res.status(404).json({ message: 'organisation not found' });
    res.json(org);

  } catch (err){
    res.status(500).json({ message: 'Server error', error: err.message });
  }
  
};

exports.createOrg = async (req, res) => {
  try {
    const { name, email, tel, website, address, password } = req.body;

    if (!name || !email || !tel || !website || !address || !password) {
      return res.status(400).json({ message: 'All fields are required - name, email, tel, website, address, password' });
    }

    const hashed_password = await bcrypt.hash(password, 10);

    const newOrg = await orgService.createOrg({
      name,
      email,
      tel,
      website,
      address,
      password: hashed_password,
    });

    res.status(201).json({ message: 'Org created successfully', Org: newOrg });
  } catch (err) {
    res.status(500).json({ message: 'Could not create Org', error: err.message });
  }
};

exports.deleteOrg = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await orgService.deleteOrg(id);

    if (deleted.affectedRows === 0) {
      return res.status(404).json({ message: 'Organisation not found' });
    }

    res.json({ message: 'Organisation deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Could not delete Organisation', error: err.message });
  }
};