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