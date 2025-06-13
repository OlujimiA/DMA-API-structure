const leadService = require('../services/leadServices.js');

exports.getLeadByOrgId = async (req, res) => {
  const lead = await leadService.getLeadById(req.params.id);
  if (!lead) return res.status(404).json({ message: 'Lead not found' });
  res.json(lead);
};
