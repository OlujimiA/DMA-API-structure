const orgModel = require('../models/orgModels');

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

const getAllContacts = async () => {
  return await orgModel.getAllContacts();
};

const getContact = async (id) => {
  return await orgModel.getContact(id);
};


module.exports = {
  getAllorgs,
  getorgById,
  createOrg,
  updateOrg,
  deleteOrg,
  createContact,
  getContact,
  getAllContacts,
};