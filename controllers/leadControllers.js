const leadService = require('../services/leadServices.js');

exports.getAllLeads = async (req, res) => {
  try {
    const leads = await leadService.getAllLeads();
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch leads', error: err.message });
  }
};

exports.getLeadByOrgId = async (req, res) => {
  try {
    const lead = await leadService.getLeadByOrgId(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    res.json(lead);

  } catch (err){
    res.status(500).json({ message: 'Server error', error: err.message });
  }
  
};

exports.createLead = async (req, res) => {
  try {
    const { message, service_interested, organisation_id, client_id } = req.body;

    if (!message || !service_interested || !organisation_id || !client_id) {
      return res.status(400).json({ message: 'All fields are required - message, service_interested, organisation_id, and client_id' });
    }

    const newLead = await leadService.createLead({
      message,
      service_interested,
      organisation_id,
      client_id
    });

    res.status(201).json({ message: 'Lead created successfully', lead: newLead });
  } catch (err) {
    res.status(500).json({ message: 'Could not create lead', error: err.message });
  }
};

exports.deleteLead = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await leadService.deleteLead(id);

    if (deleted.affectedRows === 0) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    res.json({ message: 'Lead deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Could not delete lead', error: err.message });
  }
};

exports.updateLead = async (req, res) => {
  try {
    const { message, service_interested } = req.body;
    const { id } = req.params;

    if (!message || !service_interested) {
      return res.status(400).json({ message: 'All fields are required - message, service_interested' });
    }

    const updated = await leadService.updateLead(id, { message, service_interested });

    if (updated.affectedRows === 0) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    res.json({ message: 'Lead updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Could not update lead', error: err.message });
  }
};
