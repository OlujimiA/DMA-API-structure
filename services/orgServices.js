const orgModel = require('../models/orgModels.js');

const getAllorgs = async () => {
  return await orgModel.getAllorgs();
};

const getorgById = async (id) => {
  return await orgModel.getorgById(id);
};

const createOrg = async (OrgData) => {
  return await orgModel.createOrg(OrgData);
};

const updateOrg = async (id, updateData) => {
  return await orgModel.updateOrg(id, updateData);
};

const deleteOrg = async (id) => {
  return await orgModel.deleteOrg(id);
};

const createContact = async (id) => {
  return await orgModel.createContact(id);
};

module.exports = {
  getAllorgs,
  getorgById,
  createOrg,
  updateOrg,
  deleteOrg,
  createContact,
};