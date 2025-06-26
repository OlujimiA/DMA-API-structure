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
    const { name, email, address, country, type, industry, rc_number, logo_url } = req.body;

    if ( !name || !email || !address || !country || !type || !industry || !rc_number || !logo_url ) {
      return res.status(400).json({ message: 'All fields are required - name, email, address, country, type, industry, rc_number, logo_url' });
    }

    const newOrg = await orgService.createOrg({
      name,
      email,
      address,
      country,
      type,
      industry,
      rc_number,
      staff_size,
      logo_url,
    });

    res.status(201).json({ message: 'Org created successfully', Org: newOrg });
  } catch (err) {
    res.status(500).json({ message: 'Could not create Org', error: err.message });
  }
};

exports.updateOrg = async (req, res) => {
  try {
    const { name, email, address, country, type, industry, rc_number, logo_url } = req.body;
    const { id } = req.params;

    if ( !name || !email || !address || !country || !type || !industry || !rc_number || !logo_url ) {
      return res.status(400).json({ message: 'All fields are required - name, email, address, country, type, industry, rc_number, logo_url' });
    }

    const updated = await orgService.updateOrg(id, { name, email, address, country, type, industry, rc_number, logo_url });

    if (!updated) {
      return res.status(404).json({ message: 'organisation not found'});
    }

    res.json({ message: 'Organisation updated successfully', Organisation: updated });
  } catch (err) {
    res.status(500).json({ message: 'Could not update organisation', error: err.message });
  }
};

exports.deleteOrg = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await orgService.deleteOrg(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Organisation not found' });
    }

    res.json({ message: 'Organisation deleted successfully', Organisation: deleted });
  } catch (err) {
    res.status(500).json({ message: 'Could not delete Organisation', error: err.message });
  }
};

exports.createContact = async (req, res) => {
  try {
    const { name, pfp_url, doc_url, organisation_id } = req.body;
    if (!name || !pfp_url || !doc_url || !organisation_id){
      return res.status(400).json({ message: 'All fields are required - name, pfp_url, doc_url, organisation_id' });
    }

    const newContact = await orgService.createContact({ name, pfp_url, doc_url, organisation_id });

    res.status(201).json({ message: 'Organisation contact created successfully', Contact: newContact });

  } catch (err) {
    res.status(500).json({ message: 'Failed to create a Contact profile', Error: err.message });
  }
};

exports.getContact = async (req, res) => {
  try{
    const contacts = await orgService.getContact();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get contacts', Error: err.message});
  }
};