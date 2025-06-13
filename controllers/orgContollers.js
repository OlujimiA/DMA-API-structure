const orgService = require('../services/orgServices.js');

exports.getAllorgs = async (req, res) => {
  const orgs = await orgService.getAllorgs();
  res.json(orgs);
};

exports.getOrgById = async (req, res) => {
  const org = await orgService.getorgById(req.params.id);
  if (!org) return res.status(404).json({ message: 'Organisation not found' });
  res.json(org);
};