const serviceService = require('../services/serviceServices.js');

exports.getServiceByOrgId = async (req, res) => {
  const service = await serviceService.getServiceByOrgId(req.params.id);
  if (!service) return res.status(404).json({ message: 'Service not found' });
  res.json(service);
};