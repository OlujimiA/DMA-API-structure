const leadModel = require('../models/leadModels.js');

const getAllLeads = async () => {
  return await leadModel.getAllLeads();
};

const getLeadByOrgId = async (id) => {
  return await leadModel.getLeadByOrgId(id);
};

const createLead = async (leadData) => {
  return await leadModel.createLead(leadData);
};

const deleteLead = async (id) => {
  return await leadModel.deleteLead(id);
};

const updateLead = async (id, updateData) => {
  return await leadModel.updateLead(id, updateData);
};

module.exports = {
  getAllLeads,
  getLeadByOrgId,
  createLead,
  deleteLead,
  updateLead,
};